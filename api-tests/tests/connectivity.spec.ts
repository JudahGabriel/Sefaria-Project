import { test, expect } from '@playwright/test';

test('API connectivity check', async ({ request }) => {
  console.log('Testing API connectivity...');

  const response = await request.get('/healthz', { timeout: 10000 });
  console.log(`Health check returned: ${response.status()}`);
  expect(response.status()).toBe(200);
});
