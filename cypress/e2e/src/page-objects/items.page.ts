export class ItemsPage {
  getPriceInputField() {
    return cy.get('[data-range-filter="price"] input');
  }

  enterPriceFrom(price: number) {
    this.getPriceInputField().first().click();
    this.getPriceInputField().first().clear();
    this.getPriceInputField().first().type(price.toString());
  }

  enterPriceTo(price: number) {
    this.getPriceInputField().last().click();
    this.getPriceInputField().last().clear();
    this.getPriceInputField().last().type(price.toString());
  }

  getBrand() {
    return cy.get('.f-list.cropped a');
  }

  selectBrand(brand: string) {
    this.getBrand().contains(brand).click();
  }

  getAvailability() {
    return cy.get('[data-id="available_in_city"].f-check');
  }

  selectAvailableInCityOption() {
    this.getAvailability().click();
  }

  getShowItems() {
    return cy.get('[class="f-popup__message"]');
  }

  showFilteredItems(popupName: string) {
    this.getShowItems().contains(popupName).click();
  }

  getPriceValue() {
    return cy.get('.product-card__buy-box [class="v-pb"] .v-pb__cur');
  }

  getShoppingCartSign() {
    return cy.get('.products-layout__item .v-btn--cart');
  }

  addFirstShownItemToShoppingCart() {
    this.getShoppingCartSign().first().click();
  }

  getComebackButton() {
    return cy.get('.cart-popup__content .comeback');
  }

  clickComebackButton() {
    this.getComebackButton().click();
  }

  getCartButton() {
    return cy.get('.mh-cart button');
  }

  getLogo() {
    return cy.get('.mh__sr .v-logo');
  }

  getItemTitle() {
    return cy.get('.product-card__content');
  }

  getAddToCompareIcon(itemName: string) {
    return cy.get(`[title="${itemName}"]`).siblings('.product-card__main').find('.compare svg');
  }

  addItemToCompareList(itemName: string) {
    this.getAddToCompareIcon(itemName).click();
  }

  getCompareItemButton() {
    return cy.get('.mh-button.mh-compare');
  }

  verifySearchedItems(textToBePresentOnItem: string) {
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
  verifyFilterCorrectness(priceFrom: number, priceTo: number) {
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

  gotoMainPage() {
    this.getLogo().click();
  }

  gotoShoppingCartPage() {
    this.getCartButton().click();
  }

  gotoCompareItemsPage() {
    this.getCompareItemButton().click();
  }
}

export const itemsPage = new ItemsPage();