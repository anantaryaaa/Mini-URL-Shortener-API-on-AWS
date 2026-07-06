const AppError = require('../utils/AppError');

function validateCreateUrl(req, res, next) {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return next(new AppError('originalUrl is required', 400, 'VALIDATION_ERROR'));
  }

  if (typeof originalUrl !== 'string') {
    return next(new AppError('originalUrl must be a string', 400, 'VALIDATION_ERROR'));
  }

  try {
    const parsedUrl = new URL(originalUrl);
    const allowedProtocols = ['http:', 'https:'];

    if (!allowedProtocols.includes(parsedUrl.protocol)) {
      return next(new AppError('Only http and https URLs are allowed', 400, 'VALIDATION_ERROR'));
    }
  } catch {
    return next(new AppError('originalUrl must be a valid URL', 400, 'VALIDATION_ERROR'));
  }

  return next();
}

module.exports = {
  validateCreateUrl
};