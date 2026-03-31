import { defineConfig } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL || 'https://www.sefaria.org';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 1,
  reporter: [
    ['list'],
    ['json', { outputFile: './reports/results.json' }],
    ['html', { outputFolder: './reports/html' }],
  ],
  use: {
    baseURL: API_BASE_URL,
    extraHTTPHeaders: process.env.AUTH_TOKEN
      ? { Authorization: `Bearer ${process.env.AUTH_TOKEN}` }
      : {},
  },
  timeout: 30000,
  expect: { timeout: 5000 },
});
