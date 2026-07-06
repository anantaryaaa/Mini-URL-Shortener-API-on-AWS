function normalizeUrl(originalUrl) {
  return new URL(originalUrl).toString();
}

function buildShortUrl(code) {
  const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;

  return `${baseUrl.replace(/\/$/, '')}/r/${code}`;
}

module.exports = {
  normalizeUrl,
  buildShortUrl
};