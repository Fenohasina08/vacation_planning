const express = require('express');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./config/swagger');
const routes = require('./routes');

const requestIdMiddleware = require('./middlewares/request-id.middleware');
const notFoundMiddleware = require('./middlewares/not-found.middleware');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

// Middlewares globaux
app.use(requestIdMiddleware);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Route principale
app.get('/', (req, res) => {
  res.json({
    message: 'IT Solution API',
    status: 'running'
  });
});

// Documentation API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes API
app.use('/api/v1', routes);

// Gestion des erreurs
app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
