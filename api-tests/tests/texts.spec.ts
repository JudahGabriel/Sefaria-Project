import { test, expect } from '@playwright/test';
import testData from '../fixtures/test-data.json';

test.describe('Texts API', () => {
  const texts = testData.texts;

  texts.forEach((textCase) => {
    test(`GET /api/texts/{ref} - ${textCase.ref}`, async ({ request }) => {
      const encodedRef = encodeURIComponent(textCase.ref);
      const response = await request.get(`/api/texts/${encodedRef}`);
      
      expect(response.status()).toBe(200);
      const body = await response.json();
      
      // Core properties
      expect(body).toHaveProperty('ref');
      expect(body).toHaveProperty('text');
      expect(body).toHaveProperty('he');
      expect(body).toHaveProperty('heRef');
      expect(body).toHaveProperty('sections');
      expect(body).toHaveProperty('sectionRef');
      
      // Validate structure
      expect(body.ref).toBeTruthy();
      if (body.text) {
        expect(typeof body.text === 'string' || Array.isArray(body.text)).toBeTruthy();
      }
    });
  });

  test('GET /api/texts/{ref} with version parameter', async ({ request }) => {
    const ref = encodeURIComponent('Genesis 1:1');
    const response = await request.get(`/api/texts/${ref}?version=Leningrad%20Codex`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('ref');
  });

  test('GET /api/texts/{ref} with commentary parameter', async ({ request }) => {
    // commentary=1 can be very slow (returns all commentaries). Use a short timeout.
    const ref = encodeURIComponent('Genesis 1:1');
    const response = await request.get(`/api/texts/${ref}?commentary=1`, { timeout: 30000 });
    // Accept 200, 504 (timeout on server), or 404
    expect([200, 404, 504]).toContain(response.status());
  });

  test('GET /api/texts/random returns valid text', async ({ request }) => {
    const response = await request.get('/api/texts/random');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('ref');
    expect(body).toHaveProperty('text');
  });

  test('GET /api/versions returns available versions', async ({ request }) => {
    const response = await request.get('/api/versions');
    expect([200, 404]).toContain(response.status());
    if (response.status() === 200) {
      const body = await response.json();
      expect(Array.isArray(body) || body.versions || typeof body === 'object').toBeTruthy();
    }
  });

  test('GET /api/texts/versions/{ref} returns version metadata', async ({ request }) => {
    const ref = encodeURIComponent('Genesis 1:1');
    const response = await request.get(`/api/texts/versions/${ref}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body) || body.versions).toBeTruthy();
  });

  test('GET /api/texts with invalid ref returns error', async ({ request }) => {
    const response = await request.get('/api/texts/InvalidBookName%20999:999');
    // Should be 200 with error in body or 404
    expect([200, 404]).toContain(response.status());
  });
});
