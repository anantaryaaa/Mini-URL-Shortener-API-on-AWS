const urls = new Map();

function save(record) {
  urls.set(record.code, record);
}

function findByCode(code) {
  return urls.get(code) || null;
}

function findByOriginalUrl(originalUrl) {
  for (const record of urls.values()) {
    if (record.originalUrl === originalUrl) {
      return record;
    }
  }

  return null;
}

function getAll() {
  return Array.from(urls.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

function remove(code) {
  urls.delete(code);
}

function has(code) {
  return urls.has(code);
}

module.exports = {
  save,
  findByCode,
  findByOriginalUrl,
  getAll,
  remove,
  has
};