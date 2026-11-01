
import { test, expect } from '../fixtures/testFixtures';

test.step('cart page displays its title', async ({ cartPage }) => {
  await cartPage.open();

  await expect(cartPage.cartTitle).toBeVisible();
});

test.step('added product appears in cart', async ({ inventoryPage, cartPage }) => {
  // Step 1: Open the inventory page
  await inventoryPage.open();

  // Step 2: Add the first product to the cart
  await inventoryPage.addFirstProductToCart();

  // Step 3: Open the cart page
  await cartPage.open();

  // Step 4: Verify that a cart item is visible
  await cartPage.isProductInCart();

  await cartPage.verifyProductName('Sauce Labs Backpack');
});
