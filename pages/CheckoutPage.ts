import { expect, type Page, type Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly checkoutTitle: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly overviewTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutTitle = page.getByText('Checkout: Your Information', {
      exact: true,
    });
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.overviewTitle = page.getByText('Checkout: Overview', {
      exact: true,
    });
  }

  async fillCheckoutInfo(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await expect(this.checkoutTitle).toBeVisible();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueCheckout() {
    await this.continueButton.click();
  }
}
