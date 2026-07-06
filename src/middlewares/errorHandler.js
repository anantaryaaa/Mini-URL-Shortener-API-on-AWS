const AppError = require('../utils/AppError');

function notFoundHandler(req, res, next) {
  const error = new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404, 'ROUTE_NOT_FOUND');
  next(error);
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const code = err.code || 'INTERNAL_SERVER_ERROR';

  return res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
    error: {
      code
    }
  });
}

module.exports = {
  notFoundHandler,
  errorHandler
};