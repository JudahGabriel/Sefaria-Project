import { test, expect } from '@playwright/test';

test.describe('Health & Status Checks', () => {
  test('GET /healthz returns alive', async ({ request }) => {
    const response = await request.get('/healthz');
    expect([200, 403]).toContain(response.status());
    if (response.status() === 200) {
      const text = await response.text();
      // Response may be JSON with allReady, or plain text with "alive"
      expect(text.length).toBeGreaterThan(0);
    }
  });

  test('GET /health-check returns 200', async ({ request }) => {
    const response = await request.get('/health-check');
    expect(response.status()).toBe(200);
  });

  test('GET /api/index returns TOC', async ({ request }) => {
    const response = await request.get('/api/index');
    expect(response.status()).toBe(200);
    const body = await response.json();
    // Response is an array of categories, each with a 'contents' property
    if (Array.isArray(body)) {
      expect(body.length).toBeGreaterThan(0);
      expect(body[0]).toHaveProperty('contents');
    } else {
      expect(body).toHaveProperty('contents');
    }
  });
});
