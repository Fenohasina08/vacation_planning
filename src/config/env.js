require('dotenv').config();

const requiredVariables = [
  'DATABASE_URL',
  'SESSION_SECRET'
];

const missingVariables = requiredVariables.filter(
  (variable) => !process.env[variable]
);

if (missingVariables.length > 0) {
  throw new Error(
    `Variables d'environnement manquantes : ${missingVariables.join(', ')}`
  );
}

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  databaseUrl: process.env.DATABASE_URL,
  sessionSecret: process.env.SESSION_SECRET
};

module.exports = env;
