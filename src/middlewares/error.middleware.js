const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  
  res.status(status).type('application/problem+json').json({
    type: err.type || 'about:blank',
    title: err.title || 'Internal Server Error',
    status: status,
    detail: err.message || 'Une erreur inattendue est survenue',
    instance: req.originalPath || req.url
  });
};

module.exports = errorHandler;