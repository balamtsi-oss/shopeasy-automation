
import { test, expect } from '../fixtures/testFixtures';
import products from '../data/products.json';

for (const product of products) {
  test(`verify product: ${product}`, async ({ inventoryPage }) => {
    await inventoryPage.open();

    await inventoryPage.isProductVisible(product);
  });
}


test('add product to cart', async ({ inventoryPage }) => {
  await inventoryPage.open();

  await inventoryPage.addFirstProductToCart();

  await expect(inventoryPage.cartBadge).toHaveText('1');
});
