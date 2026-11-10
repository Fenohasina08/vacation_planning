require('dotenv').config();

const { Pool } = require('pg');

// Pool de connexions PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000
});

// Gestion des erreurs inattendues du pool
pool.on('error', (error) => {
  console.error('Erreur inattendue PostgreSQL :', error.message);
});

// Vérifier la connexion à PostgreSQL
const connectDatabase = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('La variable DATABASE_URL est absente.');
  }

  const client = await pool.connect();

  try {
    const result = await client.query(
      'SELECT current_database() AS database, NOW() AS server_time'
    );

    console.log('Connexion PostgreSQL réussie.');
    console.log('Base de données :', result.rows[0].database);

    return result.rows[0];
  } finally {
    client.release();
  }
};

// Fermer proprement les connexions
const closeDatabase = async () => {
  await pool.end();
  console.log('Pool PostgreSQL fermé.');
};

module.exports = {
  pool,
  connectDatabase,
  closeDatabase
};
