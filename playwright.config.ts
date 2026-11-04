
import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';
console.log('Jira token loaded:', !!process.env.JIRA_API_TOKEN);

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
reporter: [
  ['html', { open: 'never' }],
  ['allure-playwright'],
  ['./JiraReporter.ts']
],
  // Shared settings for all projects
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
     screenshot: 'only-on-failure',

    launchOptions: {
      slowMo: 2000,
    },
  },

  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
         storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
         storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});
