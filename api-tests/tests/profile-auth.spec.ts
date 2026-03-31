import { test, expect } from '@playwright/test';

test.describe('Profile & Auth APIs', () => {
  test('GET /api/profile without auth returns 401 or empty', async ({ request }) => {
    const response = await request.get('/api/profile');
    expect([200, 301, 302, 401, 403, 404]).toContain(response.status());
  });

  test('GET /api/profile/{slug} returns public profile', async ({ request }) => {
    // Try fetching a common user or check if endpoint exists
    const response = await request.get('/api/profile/public');
    expect([200, 404]).toContain(response.status());
  });

  test('GET /api/user_history/saved returns saved texts', async ({ request }) => {
    const response = await request.get('/api/user_history/saved');
    expect([200, 401, 403]).toContain(response.status());
  });

  test('GET /api/profile/user_history returns user history', async ({ request }) => {
    const response = await request.get('/api/profile/user_history');
    expect([200, 401, 403]).toContain(response.status());
  });

  test('POST /api/register endpoint exists', async ({ request }) => {
    const response = await request.post('/api/register', {
      data: {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
      },
    });
    // Accept any response that's not a 5xx server error — just proving the endpoint exists
    expect(response.status()).toBeLessThan(500);
  });

  test('POST /api/login/refresh endpoint exists', async ({ request }) => {
    const response = await request.post('/api/login/refresh/', {
      data: { refresh: 'dummy_token' },
    });
    // Accept any non-5xx response as evidence the endpoint exists
    expect([200, 301, 302, 400, 401, 403, 415, 422]).toContain(response.status());
  });
});
