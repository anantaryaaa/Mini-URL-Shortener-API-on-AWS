const urlStore = require('../store/urlStore');
const AppError = require('../utils/AppError');
const { generateUniqueCode } = require('../utils/codeGenerator');
const { normalizeUrl, buildShortUrl } = require('../utils/urlHelpers');

function createShortUrl(originalUrl) {
  const normalizedUrl = normalizeUrl(originalUrl);

  const existingUrl = urlStore.findByOriginalUrl(normalizedUrl);
  if (existingUrl) {
    return {
      ...existingUrl,
      shortUrl: buildShortUrl(existingUrl.code)
    };
  }

  const code = generateUniqueCode();
  const now = new Date().toISOString();

  const record = {
    code,
    originalUrl: normalizedUrl,
    shortUrl: buildShortUrl(code),
    createdAt: now,
    updatedAt: now
  };

  urlStore.save(record);

  return record;
}

function getAllUrls() {
  return urlStore.getAll();
}

function getUrlByCode(code) {
  const record = urlStore.findByCode(code);

  if (!record) {
    throw new AppError('Short code not found', 404, 'URL_NOT_FOUND');
  }

  return record;
}

function deleteUrlByCode(code) {
  const record = urlStore.findByCode(code);

  if (!record) {
    throw new AppError('Short code not found', 404, 'URL_NOT_FOUND');
  }

  urlStore.remove(code);

  return {
    code,
    deleted: true
  };
}

module.exports = {
  createShortUrl,
  getAllUrls,
  getUrlByCode,
  deleteUrlByCode
};