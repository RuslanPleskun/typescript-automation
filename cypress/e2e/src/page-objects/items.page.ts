export class ItemsPage {
  getPriceInputField() {
    return cy.get('[data-range-filter="price"] input');
  }

  enterPriceFrom(price: number): void {
    this.getPriceInputField().first().click();
    this.getPriceInputField().first().clear();
    this.getPriceInputField().first().type(price.toString());
  }

  enterPriceTo(price: number): void {
    this.getPriceInputField().last().click();
    this.getPriceInputField().last().clear();
    this.getPriceInputField().last().type(price.toString());
  }

  getBrand(): Cypress.Chainable<JQuery> {
    return cy.get('.f-list.cropped a');
  }

  selectBrand(brand: string): void {
    this.getBrand().contains(brand).click();
  }

  getAvailability(): Cypress.Chainable<JQuery> {
    return cy.get('[data-id="available_in_city"].f-check');
  }

  selectAvailableInCityOption(): void {
    this.getAvailability().click();
  }

  getShowItems(): Cypress.Chainable<JQuery> {
    return cy.get('[class="f-popup__message"]');
  }

  showFilteredItems(popupName: string): void {
    this.getShowItems().contains(popupName).click();
  }

  getPriceValue(): Cypress.Chainable<JQuery> {
    return cy.get('.product-card__buy-box [class="v-pb"] .v-pb__cur');
  }

  getShoppingCartSign(): Cypress.Chainable<JQuery> {
    return cy.get('.products-layout__item .v-btn--cart');
  }

  addFirstShownItemToShoppingCart(): void {
    this.getShoppingCartSign().first().click();
  }

  getComebackButton(): Cypress.Chainable<JQuery> {
    return cy.get('.cart-popup__content .comeback');
  }

  clickComebackButton(): void {
    this.getComebackButton().click();
  }

  getCartButton(): Cypress.Chainable<JQuery> {
    return cy.get('.mh-cart button');
  }

  getLogo(): Cypress.Chainable<JQuery> {
    return cy.get('.mh__sr .v-logo');
  }

  getItemTitle(): Cypress.Chainable<JQuery> {
    return cy.get('.product-card__content');
  }

  getAddToCompareIcon(itemName: string): Cypress.Chainable<JQuery> {
    return cy.get(`[title="${itemName}"]`).siblings('.product-card__main').find('.compare svg');
  }

  addItemToCompareList(itemName: string): void {
    this.getAddToCompareIcon(itemName).click();
  }

  getCompareItemButton(): Cypress.Chainable<JQuery> {
    return cy.get('.mh-button.mh-compare');
  }

  verifySearchedItems(textToBePresentOnItem: string): void {
    this.getItemTitle().each(($element) => {
      cy.wrap($element).should('contain.text', textToBePresentOnItem);
    });
  }

  /**
   * This method is taking all the prices on the page in range (priceFrom, priceFrom)
   * and checks whether no item the price of which is out of this range is present 
   * on the page
   * @param {number} priceFrom - bottom price boundary
   * @param {number} priceTo - top price bundary
   */
  verifyFilterCorrectness(priceFrom: number, priceTo: number): void {
    cy.wait(1000);                                  // This delay is necessary here for page rendering
    this.getPriceValue().then(($elements) => {
      const pricesArray = $elements.map((index, element) => {
        const priceText = Cypress.$(element).text();
        const price = priceText.replace(/[^0-9.]/g, '').trim();
        return price;
      }).get();
    
      cy.wrap(pricesArray).should((prices) => {
        const condition = prices.every((price) => price >= priceFrom.toString() && price <= priceTo.toString());
        expect(condition, 'Prices should be within the specified range').to.be.true;
      });
    });
  }

  gotoMainPage(): void {
    this.getLogo().click();
  }

  gotoShoppingCartPage(): void {
    this.getCartButton().click();
  }

  gotoCompareItemsPage(): void {
    this.getCompareItemButton().click();
  }
}

export const itemsPage = new ItemsPage();