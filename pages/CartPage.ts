
import { expect, type Page, type Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartTitle: Locator;
  readonly cartItem: Locator;
  readonly cartItemName: Locator;
  

  constructor(page: Page) {
    this.page = page;

    this.cartTitle = page.getByText('Your Cart', {
      exact: true,
    });

    this.cartItem = page.locator('.cart_item');
    this.cartItemName = page.locator('.inventory_item_name');
  }

  async open() {
    await this.page.goto('/cart.html');
  }

  async isProductInCart() {
    await expect(this.cartItem).toBeVisible();
  }
  async verifyProductName(productName: string) {
  await expect(this.cartItemName).toHaveText(productName);
}
}
