const crypto = require('crypto');

const urlStore = require('../store/urlStore');

const CODE_LENGTH = 6;
const MAX_ATTEMPTS = 1000;

function generateCandidateCode() {
  return crypto.randomBytes(16).toString('base64url').slice(0, CODE_LENGTH);
}

function generateUniqueCode() {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const candidate = generateCandidateCode();

    if (!urlStore.has(candidate)) {
      return candidate;
    }
  }

  throw new Error('Failed to generate a unique short code');
}

module.exports = {
  generateUniqueCode
};