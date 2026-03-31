import { test, expect } from '@playwright/test';

test.describe('Search API', () => {
  test('GET /search with basic query', async ({ request }) => {
    // /search is an HTML page, not a JSON API endpoint
    const response = await request.get('/search?q=Torah');
    expect(response.status()).toBe(200);
  });

  test('GET /search with "Genesis" query', async ({ request }) => {
    // /search is an HTML page, not a JSON API endpoint
    const response = await request.get('/search?q=Genesis');
    expect(response.status()).toBe(200);
  });

  test('GET /api/search-wrapper/es8 exists', async ({ request }) => {
    const response = await request.get('/api/search-wrapper/es8');
    expect(response.status()).toBe(200);
  });

  test('GET /api/search-wrapper returns data', async ({ request }) => {
    const response = await request.get('/api/search-wrapper');
    expect(response.status()).toBe(200);
  });

  test('GET /api/opensearch-suggestions for autocomplete', async ({ request }) => {
    const response = await request.get('/api/opensearch-suggestions?q=Gene');
    expect(response.status()).toBe(200);
    const body = await response.json();
    // Should return array of suggestions
    expect(Array.isArray(body)).toBeTruthy();
  });

  test('GET /search with limit parameter', async ({ request }) => {
    // /search is an HTML page, not a JSON API endpoint
    const response = await request.get('/search?q=Torah&size=5');
    expect(response.status()).toBe(200);
  });
});
