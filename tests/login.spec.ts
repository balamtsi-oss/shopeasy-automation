import { test, expect } from '../fixtures/testFixtures';
import { standardUser } from '../data/users';

test.describe('Login tests', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('login using custom fixture', async ({ page, loginPage }) => {
    await page.goto('/');
    await loginPage.login(standardUser.username, standardUser.password);

    await expect(page).toHaveURL(/inventory/);
  });

  test('login with invalid credentials displays error message', async ({ page, loginPage }) => {
    await page.goto('https://www.saucedemo.com/');

    await loginPage.login('invalid_user', 'wrong_password');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });
});
