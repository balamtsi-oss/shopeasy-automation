
import { expect, type Page, type Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartTitle: Locator;
  readonly cartItem: Locator;
  readonly cartItemName: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartTitle = page.getByText('Your Cart', {
      exact: true,
    });

    this.cartItem = page.locator('.cart_item');
    this.cartItemName = page.locator('.inventory_item_name');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async open(): Promise<void> {
    await this.page.goto('/cart.html');
  }

  async isProductInCart(): Promise<void> {
    await expect(this.cartItem).toBeVisible();
  }

  async verifyProductName(productName: string): Promise<void> {
    await expect(this.cartItemName).toHaveText(productName);
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
