import { test, expect } from '../fixtures/testFixtures';

test.describe('Checkout flow', () => {
  test('add Sauce Labs Backpack to cart, proceed to checkout, and fill customer info', async ({
    page,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    // Step 1: Open the inventory page
    await inventoryPage.open();

    // Step 2: Add Sauce Labs Backpack to the cart
    await inventoryPage.addProductToCart('Sauce Labs Backpack');

    // Step 3: Click on the basket / shopping cart icon
    await inventoryPage.clickCart();

    // Verify cart page displays the added product
    await expect(cartPage.cartTitle).toBeVisible();
    await cartPage.verifyProductName('Sauce Labs Backpack');

    // Step 4: Click on checkout button
    await cartPage.clickCheckout();

    // Step 5: Fill in dummy customer information for first name, last name, and zip/postal code
    await checkoutPage.fillCustomerInformation('John', 'Doe', '12345');

    // Step 6: Hit the continue button
    await checkoutPage.clickContinue();

    // Verify navigation to checkout step two (overview)
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(checkoutPage.checkoutTitle).toHaveText('Checkout: Overview');

    await checkoutPage.finishOrder();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(checkoutPage.completionMessage).toHaveText('Thank you for your order!');
  });
});
