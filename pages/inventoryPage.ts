import { expect, type Page, type Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly productNames: Locator;
  readonly addToCartButtons: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productNames = page.locator('.inventory_item_name');
    this.addToCartButtons = page.getByRole('button', {
      name: 'Add to cart',
    });
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async open() {
   await this.page.goto('/inventory.html');
  }

  async selectProduct(productName: string) {
    await this.page.getByText(productName, { exact: true }).click();
  }

  async addToCart() {
    await this.addToCartButtons.first().click();
  }

  async addFirstProductToCart() {
    await this.addToCartButtons.first().click();
  }

  async openCart() {
    await this.cartLink.click();
  }

async isProductVisible(productName: string) {
  await expect(
    this.page.getByText(productName, { exact: true })
  ).toBeVisible();
}
}
