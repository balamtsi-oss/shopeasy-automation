import { test, expect } from '../fixtures/testFixtures';

test.setTimeout(120000);

test('checkout Backpack and Bolt T-Shirt in Chrome', async ({
  page,
  loginPage,
  inventoryPage,
  cartPage,
  checkoutPage,
}) => {
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory.html/);
  await expect(page).toHaveURL(
    'https://www.saucedemo.com/inventory.html',
  );

  const backpack = page
    .locator('.inventory_item')
    .filter({ hasText: 'Sauce Labs Backpack' });
  await backpack.getByRole('button', { name: 'Add to cart' }).click();

  const boltTShirt = page
    .locator('.inventory_item')
    .filter({ hasText: 'Sauce Labs Bolt T-Shirt' });
  await boltTShirt.getByRole('button', { name: 'Add to cart' }).click();

  await expect(inventoryPage.cartBadge).toHaveText('2');

  await inventoryPage.openCart();
  await expect(cartPage.cartTitle).toBeVisible();
  await expect(
    page.getByText('Sauce Labs Backpack', { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText('Sauce Labs Bolt T-Shirt', { exact: true }),
  ).toBeVisible();
  await expect(cartPage.cartItem).toHaveCount(2);

  await cartPage.clickCheckout();
  await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
  await expect(checkoutPage.firstNameInput).toHaveValue('John');
  await expect(checkoutPage.lastNameInput).toHaveValue('Doe');
  await expect(checkoutPage.postalCodeInput).toHaveValue('12345');

  await checkoutPage.continueCheckout();
  await expect(checkoutPage.overviewTitle).toBeVisible();
});
