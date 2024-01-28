export class MainPage {
  getCategory(): Cypress.Chainable<JQuery> {
    return cy.get('#js-menu-wrapper a');
  }

  selectCategory(category: string): void {
    this.getCategory().contains(category).click();
  }

  getPriceInputField(): Cypress.Chainable<JQuery> {
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

  getSearchField(): Cypress.Chainable<JQuery> {
    return cy.get('#search-form__input');
  }

  searchItem(itemName: string): void {
    this.getSearchField().click();
    this.getSearchField().clear();
    this.getSearchField().type(itemName).type('{enter}');
  }

  getCompareButton(): Cypress.Chainable<JQuery> {
    return cy.get('.mh-button.mh-compare');
  }

  verifyThatCompareButtonIsDisabled(): void {
    this.getCompareButton().should('have.class', 'disabled');
  }
}

export const mainPage = new MainPage();