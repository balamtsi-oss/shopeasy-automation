
import { test as setup, expect } from '@playwright/test';
import { standardUser } from '../data/users';
import { LoginPage } from '../pages/LoginPage';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('/');
  await loginPage.login(standardUser.username, standardUser.password);
  await expect(page).toHaveURL(/inventory/);

  await page.context().storageState({
    path: 'playwright/.auth/user.json',
  });
});

