const app = require('./app');
const env = require('./config/env');
const {
  connectDatabase,
  closeDatabase
} = require('./config/database');

let server;
let shuttingDown = false;

const shutdown = async (signal) => {
  if (shuttingDown) return;
  shuttingDown = true;

  console.log(`\n${signal} reçu. Arrêt du serveur...`);

  try {
    if (server) {
      await new Promise((resolve, reject) => {
        server.close((error) => {
          if (error) reject(error);
          else resolve();
        });
      });

      console.log('Serveur HTTP arrêté.');
    }

    await closeDatabase();
    console.log('Application arrêtée proprement.');
  } catch (error) {
    console.error('Erreur pendant l’arrêt :', error.message);
    process.exitCode = 1;
  }
};

const startServer = async () => {
  try {
    await connectDatabase();

    server = app.listen(env.port, () => {
      console.log(`IT Solution API démarrée sur le port ${env.port}`);
      console.log(`Environnement : ${env.nodeEnv}`);
    });
  } catch (error) {
    console.error('Erreur au démarrage :', error.message);

    try {
      await closeDatabase();
    } catch (closeError) {
      console.error('Erreur fermeture PostgreSQL :', closeError.message);
    }

    process.exitCode = 1;
  }
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

startServer();
