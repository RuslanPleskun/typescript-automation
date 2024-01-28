export class CompareItemsPage {
  getProductTitle() {
    return cy.get('.product-card__content a.product-card__title');
  }

  getRemoveButton() {
    return cy.get('.product-card__pictures svg.remove-icon');
  }

  removeFirstItem() {
    this.getRemoveButton().first().click();
    cy.on('window:alert', () => true);
  }

  getItem() {
    return cy.get('[class="products-layout__item"]');
  }

  verifyNumberOfitemsLeft(numberOfItems: number) {
    this.getItem().should('have.length', numberOfItems);
  }

  verifyAbsenseOfItem(itemName: string) {
    this.getItem().should('not.contain', itemName);
  }

  /**
   * This method verifies if the correct items were added to the
   * comparison list and if the number of them is also correct
   * @param {string} itemNames 
   */
  verifyThatTheCorrectItemsWereAddedToTheList(itemNames: string) {
    this.getProductTitle().should('have.length', itemNames.length).each(($item, index) => {
      const title = $item.text();
      expect(title).to.equal(itemNames[index]);
    });
  }
}

export const compareItemsPage = new CompareItemsPage();