import { test, expect } from '../fixtures/testFixtures';

test('login using custom fixture', async ({ page, loginPage }) => {
  await page.goto('https://www.saucedemo.com/');

  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);
});