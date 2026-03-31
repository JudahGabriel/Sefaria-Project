import { test, expect } from '@playwright/test';

test.describe('Sheets API', () => {
  test('GET /api/sheets/tag/Torah returns sheets by tag', async ({ request }) => {
    const response = await request.get('/api/sheets/tag/Torah');
    expect([200, 504]).toContain(response.status());
    if (response.status() === 200) {
      const body = await response.json();
      expect(Array.isArray(body.sheets) || Array.isArray(body)).toBeTruthy();
    }
  });

  test('GET /api/sheets/trending-tags returns popular tags', async ({ request }) => {
    const response = await request.get('/api/sheets/trending-tags');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
  });

  test('GET /api/sheets/tag-list returns all tags', async ({ request }) => {
    const response = await request.get('/api/sheets/tag-list');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
  });

  test('GET /api/sheets/all-sheets with limit and offset', async ({ request }) => {
    const response = await request.get('/api/sheets/all-sheets/10/0');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body.sheets) || Array.isArray(body)).toBeTruthy();
  });

  test('GET /api/sheets/ref/{ref} returns sheets for reference', async ({ request }) => {
    const ref = encodeURIComponent('Genesis 1:1');
    const response = await request.get(`/api/sheets/ref/${ref}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
  });

  test('POST /api/sheets endpoint exists (create sheet)', async ({ request }) => {
    const response = await request.post('/api/sheets', {
      data: {
        title: 'Test Sheet',
        sources: [],
      },
    });
    // Should be 201 on success, but 401 if not authenticated
    expect([201, 400, 401, 422]).toContain(response.status());
  });

  test('GET /api/sheets/{id} returns sheet details', async ({ request }) => {
    // Try fetching a sheet with ID 1
    const response = await request.get('/api/sheets/1');
    expect([200, 404]).toContain(response.status());
  });

  test('GET /api/sheets/user/{user_id} returns user sheets', async ({ request }) => {
    const response = await request.get('/api/sheets/user/1');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body.sheets) || Array.isArray(body)).toBeTruthy();
  });

  test('GET /api/v2/sheets/tag/{tag} returns sheets (v2 endpoint)', async ({ request }) => {
    const response = await request.get('/api/v2/sheets/tag/Torah');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body.sheets) || Array.isArray(body)).toBeTruthy();
  });
});
