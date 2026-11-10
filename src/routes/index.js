const express = require('express');

const router = express.Router();

/**
 * @route GET /
 * @description Informations générales sur l'API
 */
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'IT Solution API',
    version: '1.0.0',
    status: 'running'
  });
});

/**
 * @route GET /health
 * @description Vérifier l'état de fonctionnement de l'API
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API is healthy'
  });
});

module.exports = router;
