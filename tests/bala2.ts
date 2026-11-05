import { test, expect } from '../fixtures/testFixtures';
import type { Page } from '@playwright/test';
import type { LoginPage } from '../pages/LoginPage';

test('login using custom fixture', async ({ page, loginPage }: { page: Page; loginPage: LoginPage }) => {
  await page.goto('https://www.saucedemo.com/');

  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);
});