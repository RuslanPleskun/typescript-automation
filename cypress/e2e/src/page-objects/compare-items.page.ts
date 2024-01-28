export class CompareItemsPage {
  getProductTitle(): Cypress.Chainable<JQuery> {
    return cy.get('.product-card__content a.product-card__title');
  }

  getRemoveButton(): Cypress.Chainable<JQuery> {
    return cy.get('.product-card__pictures svg.remove-icon');
  }

  removeFirstItem(): void {
    this.getRemoveButton().first().click();
    cy.on('window:alert', () => true);
  }

  getItem(): Cypress.Chainable<JQuery> {
    return cy.get('[class="products-layout__item"]');
  }

  verifyNumberOfItemsLeft(numberOfItems: number): void {
    this.getItem().should('have.length', numberOfItems);
  }

  verifyAbsenseOfItem(itemName: string): void {
    this.getItem().should('not.contain', itemName);
  }

  /**
   * This method verifies if the correct items were added to the
   * comparison list and if the number of them is also correct
   * @param {string[]} itemNames -  the names of the products that should be in the comparison list
   */
  verifyThatTheCorrectItemsWereAddedToTheList(itemNames: string[]): void {
    this.getProductTitle().should('have.length', itemNames.length).each(($item, index) => {
      const title = $item.text();
      expect(title).to.equal(itemNames[index]);
    });
  }
}

export const compareItemsPage = new CompareItemsPage();