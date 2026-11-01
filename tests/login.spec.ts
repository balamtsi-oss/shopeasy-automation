// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../pages/LoginPage';

// test('login page example', async ({ page }) => {
//   const loginPage = new LoginPage(page);

//   await page.goto('https://www.saucedemo.com/');

//   await loginPage.login('standard_user', 'secret_sauce');

//   await expect(page).toHaveURL(/inventory/);
// });


import { test, expect } from '../fixtures/testFixtures';

test('login using custom fixture', async ({ page, loginPage }) => {
  await page.goto('https://www.saucedemo.com/');

  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);
});
