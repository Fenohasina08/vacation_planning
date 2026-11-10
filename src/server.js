const app = require('./app');
const env = require('./config/env');

// Démarrer le serveur HTTP
const server = app.listen(env.port, () => {
  console.log(`IT Solution API démarrée sur le port ${env.port}`);
  console.log(`Environnement : ${env.nodeEnv}`);
});

// Arrêt propre du serveur
const shutdown = (signal) => {
  console.log(`\n${signal} reçu. Arrêt du serveur...`);

  server.close(() => {
    console.log('Serveur HTTP arrêté.');
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
