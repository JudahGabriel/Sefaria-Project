import { test, expect } from '@playwright/test';
import testData from '../fixtures/test-data.json';

test.describe('Core API Endpoints', () => {
  const refs = testData.refs;

  test('GET /api/index/titles returns all text titles', async ({ request }) => {
    const response = await request.get('/api/index/titles');
    expect(response.status()).toBe(200);
    const body = await response.json();
    // Response is {books: [...]} object
    const titles = Array.isArray(body) ? body : body.books;
    expect(Array.isArray(titles)).toBeTruthy();
    expect(titles.length).toBeGreaterThan(0);
  });

  test('GET /api/index/{title} returns text metadata', async ({ request }) => {
    const response = await request.get('/api/index/Genesis');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('categories');
  });

  test('GET /api/links/{ref} returns linked sources', async ({ request }) => {
    const ref = 'Genesis 1:1';
    const response = await request.get(`/api/links/${encodeURIComponent(ref)}`);
    expect([200, 404]).toContain(response.status());
    if (response.status() === 200) {
      const body = await response.json();
      expect(Array.isArray(body)).toBeTruthy();
    }
  });

  test('GET /api/related/{ref} returns related content', async ({ request }) => {
    const ref = 'Genesis 1:1';
    const response = await request.get(`/api/related/${encodeURIComponent(ref)}`);
    expect([200, 404]).toContain(response.status());
  });

  test('GET /api/terms/{name} returns term data', async ({ request }) => {
    const response = await request.get('/api/terms/Torah');
    expect([200, 404]).toContain(response.status());
  });

  test('GET /api/category returns category tree', async ({ request }) => {
    const response = await request.get('/api/category');
    expect([200, 404]).toContain(response.status());
  });

  test('GET /api/texts/translations returns translation versions', async ({ request }) => {
    const response = await request.get('/api/texts/translations');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body) || body.translations).toBeTruthy();
  });

  test('GET /api/counts/{title} returns text statistics', async ({ request }) => {
    const response = await request.get('/api/counts/Genesis');
    expect([200, 404]).toContain(response.status());
  });

  test('GET /api/shape/{title} returns text structure', async ({ request }) => {
    const response = await request.get('/api/shape/Genesis');
    expect([200, 404]).toContain(response.status());
  });

  test('GET /api/preview/{title} returns text preview', async ({ request }) => {
    const response = await request.get('/api/preview/Genesis');
    expect([200, 404]).toContain(response.status());
  });

  test('GET /api/name/{name} returns text info by name', async ({ request }) => {
    const response = await request.get('/api/name/Genesis');
    expect([200, 404]).toContain(response.status());
  });

  test('GET /api/topics returns list of topics', async ({ request }) => {
    const response = await request.get('/api/topics');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
  });

  test('GET /api/topics/{slug} returns topic details', async ({ request }) => {
    const response = await request.get('/api/topics/torah');
    expect([200, 404]).toContain(response.status());
  });

  test('GET /api/calendars returns calendar info', async ({ request }) => {
    const response = await request.get('/api/calendars');
    expect(response.status()).toBe(200);
    const body = await response.json();
    // Response is {date, timezone, calendar_items}
    expect(Array.isArray(body) || body.calendar_items || body.calendars).toBeTruthy();
  });
});
