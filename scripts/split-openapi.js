const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const SOURCE = 'openapi-source.yaml';
const OUT = 'specs';

if (!fs.existsSync(SOURCE)) {
  console.error(`Erreur : ${SOURCE} est introuvable.`);
  process.exit(1);
}

const api = YAML.parse(fs.readFileSync(SOURCE, 'utf8'));

if (!api?.openapi || !api?.paths || !api?.components) {
  throw new Error('Le fichier source ne semble pas être une spécification OpenAPI valide.');
}

// 1. Répartition des routes par domaine fonctionnel
const pathRules = {
  health: p => p === '/health',
  authentication: p => p.startsWith('/auth/') || p === '/me',
  company: p => p.startsWith('/company'),
  organization: p => p.startsWith('/departments'),
  employees: p =>
    p === '/employees' ||
    (p.startsWith('/employees/') &&
      !p.includes('/balances') &&
      !p.includes('/ledger')),
  'leave-management': p =>
    p.startsWith('/leave-types') || p.startsWith('/leave-requests'),
  'approval-workflows': p =>
    p.startsWith('/workflows') ||
    p.startsWith('/approvals') ||
    p.startsWith('/approval-delegations'),
  'leave-balances': p =>
    p === '/balances' ||
    p.startsWith('/balance-adjustments') ||
    /^\/employees\/\{[^}]+\}\/(balances|ledger)$/.test(p),
  'calendar-availability': p =>
    p.startsWith('/calendar') ||
    p.startsWith('/absence-limits') ||
    p.startsWith('/availability'),
  'dashboard-exports': p =>
    p === '/dashboard' || p.startsWith('/exports'),
  notifications: p =>
    p.startsWith('/notifications') || p === '/notification-preferences',
  subscription: p =>
    p === '/plans' ||
    p === '/subscription' ||
    p.startsWith('/subscription-requests'),
  support: p => p.startsWith('/support/'),
  audit: p => p.startsWith('/audit-logs'),
  platform: p => p.startsWith('/platform/')
};

const pathFiles = Object.fromEntries(
  Object.keys(pathRules).map(name => [name, {}])
);

for (const [route, definition] of Object.entries(api.paths)) {
  const group = Object.keys(pathRules).find(name => pathRules[name](route));

  if (!group) {
    throw new Error(`Route non classée : ${route}`);
  }

  pathFiles[group][route] = definition;
}

// 2. Répartition des schémas
const schemaGroups = {
  authentication: ['Membership', 'Me'],

  company: [
    'CompanyStatus', 'Company', 'CompanySettings',
    'HolidayInput', 'Holiday'
  ],

  employee: [
    'EmployeeRole', 'EmployeeStatus',
    'DepartmentInput', 'Department',
    'EmployeeInput', 'EmployeeUpdate',
    'Employee', 'ImportJob'
  ],

  leave: [
    'LeaveRequestStatus', 'AttachmentPolicy', 'ScanStatus',
    'DayPart', 'LeaveTypeInput', 'LeaveType',
    'LeavePolicyInput', 'LeavePolicy',
    'LeaveRequestInput', 'LeaveRequestPreview',
    'LeaveRequest', 'Attachment'
  ],

  approval: [
    'ApprovalTaskStatus', 'ApproverKind',
    'WorkflowStep', 'WorkflowInput', 'Workflow',
    'Decision', 'ApprovalTask', 'Delegation'
  ],

  balance: [
    'AdjustmentStatus', 'LedgerEntryType',
    'Balance', 'LedgerEntry',
    'BalanceAdjustment', 'EmployeeSummary'
  ],

  calendar: [
    'CalendarEntry', 'Calendar',
    'AbsenceLimitInput', 'AbsenceLimit',
    'AvailabilityAlert', 'Dashboard'
  ],

  notification: [
    'Notification', 'NotificationPreference'
  ],

  subscription: [
    'RequestStatus', 'SubscriptionStatus',
    'PlanInput', 'Plan', 'Subscription',
    'SubscriptionRequest'
  ],

  support: [
    'TicketKind', 'TicketStatus',
    'SupportTicket', 'TicketMessage'
  ],

  platform: [
    'JobStatus', 'ExportFormat', 'SeverityLevel',
    'IncidentStatus', 'ExportJob', 'AuditLog',
    'PlatformCompany', 'IncidentInput', 'Incident',
    'PlatformAdmin', 'PlatformRole', 'AccessGrant'
  ]
};

const schemaFiles = Object.fromEntries(
  Object.keys(schemaGroups).map(name => [name, {}])
);

const commonSchemas = {};

for (const [name, definition] of Object.entries(api.components.schemas || {})) {
  const group = Object.keys(schemaGroups).find(
    key => schemaGroups[key].includes(name)
  );

  if (group) {
    schemaFiles[group][name] = definition;
  } else {
    commonSchemas[name] = definition;
  }
}

// 3. Réécriture des références internes
// Les références locales des fichiers séparés doivent revenir vers openapi.yaml.
function rewriteRefs(value) {
  if (Array.isArray(value)) {
    return value.map(rewriteRefs);
  }

  if (value && typeof value === 'object') {
    const result = {};

    for (const [key, item] of Object.entries(value)) {
      if (
        key === '$ref' &&
        typeof item === 'string' &&
        item.startsWith('#/components/')
      ) {
        result[key] = `../openapi.yaml${item}`;
      } else {
        result[key] = rewriteRefs(item);
      }
    }

    return result;
  }

  return value;
}

// 4. Écriture des fichiers YAML
function writeYaml(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });

  fs.writeFileSync(
    file,
    YAML.stringify(rewriteRefs(content), { lineWidth: 0 }),
    'utf8'
  );
}

// Routes
for (const [name, routes] of Object.entries(pathFiles)) {
  writeYaml(`${OUT}/paths/${name}.yaml`, routes);
}

// Schémas
for (const [name, schemas] of Object.entries(schemaFiles)) {
  writeYaml(`${OUT}/schemas/${name}.yaml`, schemas);
}

// Composants communs
writeYaml(`${OUT}/common/security.yaml`, {
  securitySchemes: api.components.securitySchemes || {}
});

writeYaml(`${OUT}/common/parameters.yaml`, {
  parameters: api.components.parameters || {}
});

writeYaml(`${OUT}/common/responses.yaml`, {
  responses: api.components.responses || {}
});

writeYaml(`${OUT}/common/schemas.yaml`, {
  schemas: commonSchemas
});

// 5. Construction du fichier OpenAPI principal
const root = {
  openapi: api.openapi,
  info: api.info,
  ...(api.servers ? { servers: api.servers } : {}),
  ...(api.tags ? { tags: api.tags } : {}),
  ...(api.security ? { security: api.security } : {}),
  paths: {},
  components: {
    securitySchemes: {},
    parameters: {},
    responses: {},
    schemas: {}
  }
};

// Références vers les fichiers de routes
for (const [group, routes] of Object.entries(pathFiles)) {
  for (const route of Object.keys(routes)) {
    const pointer = route
      .replace(/~/g, '~0')
      .replace(/\//g, '~1');

    root.paths[route] = {
      $ref: `./paths/${group}.yaml#/${pointer}`
    };
  }
}

// Références vers les composants communs
for (const name of Object.keys(api.components.securitySchemes || {})) {
  root.components.securitySchemes[name] = {
    $ref: `./common/security.yaml#/securitySchemes/${name}`
  };
}

for (const name of Object.keys(api.components.parameters || {})) {
  root.components.parameters[name] = {
    $ref: `./common/parameters.yaml#/parameters/${name}`
  };
}

for (const name of Object.keys(api.components.responses || {})) {
  root.components.responses[name] = {
    $ref: `./common/responses.yaml#/responses/${name}`
  };
}

// Références vers les schémas
for (const name of Object.keys(commonSchemas)) {
  root.components.schemas[name] = {
    $ref: `./common/schemas.yaml#/schemas/${name}`
  };
}

for (const [group, schemas] of Object.entries(schemaFiles)) {
  for (const name of Object.keys(schemas)) {
    root.components.schemas[name] = {
      $ref: `./schemas/${group}.yaml#/${name}`
    };
  }
}

writeYaml(`${OUT}/openapi.yaml`, root);

// 6. Résultat
const routeCount = Object.keys(api.paths).length;
const schemaCount = Object.keys(api.components.schemas || {}).length;

console.log('');
console.log('Séparation terminée !');
console.log(`Routes réparties : ${routeCount}`);
console.log(`Schémas répartis : ${schemaCount}`);
console.log(`Fichier principal : ${OUT}/openapi.yaml`);
console.log('');
