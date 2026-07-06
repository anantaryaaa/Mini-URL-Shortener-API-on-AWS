const urlService = require('../services/urlService');

async function createShortUrl(req, res, next) {
  try {
    const result = urlService.createShortUrl(req.body.originalUrl);

    return res.status(201).json({
      success: true,
      message: 'Short URL created successfully',
      data: result
    });
  } catch (error) {
    return next(error);
  }
}

async function getAllUrls(req, res, next) {
  try {
    const data = urlService.getAllUrls();

    return res.status(200).json({
      success: true,
      message: 'URL list retrieved successfully',
      data
    });
  } catch (error) {
    return next(error);
  }
}

async function getUrlByCode(req, res, next) {
  try {
    const data = urlService.getUrlByCode(req.params.code);

    return res.status(200).json({
      success: true,
      message: 'URL detail retrieved successfully',
      data
    });
  } catch (error) {
    return next(error);
  }
}

async function deleteUrlByCode(req, res, next) {
  try {
    const data = urlService.deleteUrlByCode(req.params.code);

    return res.status(200).json({
      success: true,
      message: 'Short URL deleted successfully',
      data
    });
  } catch (error) {
    return next(error);
  }
}

async function redirectToOriginalUrl(req, res, next) {
  try {
    const data = urlService.getUrlByCode(req.params.code);

    return res.redirect(302, data.originalUrl);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createShortUrl,
  getAllUrls,
  getUrlByCode,
  deleteUrlByCode,
  redirectToOriginalUrl
};