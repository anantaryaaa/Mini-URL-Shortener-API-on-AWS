const test = require('node:test');
const assert = require('node:assert/strict');

const app = require('../src/app');

async function startServer() {
  return new Promise((resolve) => {
    const server = app.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ server, baseUrl: `http://127.0.0.1:${port}` });
    });
  });
}

test('health endpoint returns healthy status', async (t) => {
  const { server, baseUrl } = await startServer();

  t.after(() => server.close());

  const response = await fetch(`${baseUrl}/health`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.success, true);
  assert.equal(body.data.status, 'healthy');
});

test('create, list, detail, redirect, and delete short url flow works', async (t) => {
  const { server, baseUrl } = await startServer();

  t.after(() => server.close());

  const createResponse = await fetch(`${baseUrl}/api/urls`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ originalUrl: 'https://example.com/test' })
  });

  assert.equal(createResponse.status, 201);
  const created = await createResponse.json();
  assert.equal(created.success, true);
  assert.match(created.data.code, /^[A-Za-z0-9_-]{6}$/);

  const detailResponse = await fetch(`${baseUrl}/api/urls/${created.data.code}`);
  assert.equal(detailResponse.status, 200);

  const listResponse = await fetch(`${baseUrl}/api/urls`);
  const list = await listResponse.json();
  assert.equal(list.data.length >= 1, true);

  const redirectResponse = await fetch(`${baseUrl}/r/${created.data.code}`, { redirect: 'manual' });
  assert.equal(redirectResponse.status, 302);
  assert.equal(redirectResponse.headers.get('location'), 'https://example.com/test');

  const deleteResponse = await fetch(`${baseUrl}/api/urls/${created.data.code}`, { method: 'DELETE' });
  assert.equal(deleteResponse.status, 200);

  const missingAfterDelete = await fetch(`${baseUrl}/api/urls/${created.data.code}`);
  assert.equal(missingAfterDelete.status, 404);
});

test('invalid url is rejected and missing code returns 404', async (t) => {
  const { server, baseUrl } = await startServer();

  t.after(() => server.close());

  const invalidResponse = await fetch(`${baseUrl}/api/urls`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ originalUrl: 'not-a-url' })
  });

  assert.equal(invalidResponse.status, 400);

  const missingResponse = await fetch(`${baseUrl}/api/urls/NOPE`);
  assert.equal(missingResponse.status, 404);
});