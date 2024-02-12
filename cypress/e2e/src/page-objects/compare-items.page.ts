export class CompareItemsPage {
  private get productTitle () {
    return cy.get('.product-card__content a.product-card__title')
  }

  private get removeButton () {
    return cy.get('.product-card__pictures svg.remove-icon')
  }

  private get item () {
    return cy.get('[class="products-layout__item"]')
  }

  public removeFirstItem () {
    this.removeButton.first().click()
    cy.on('window:alert', () => true)
  }

  public verifyNumberOfItemsLeft (numberOfItems: number) {
    this.item.should('have.length', numberOfItems)
  }

  public verifyAbsenseOfItem (itemName: string) {
    this.item.should('not.contain', itemName)
  }

  /**
   * This method verifies if the correct items were added to the
   * comparison list and if the number of them is also correct
   * @param {string[]} itemNames -  the names of the products that should be in the comparison list
   */
  public verifyThatTheCorrectItemsWereAddedToTheList (itemNames: string[]) {
    this.productTitle.should('have.length', itemNames.length).each(($item, index) => {
      const title = $item.text()
      expect(title).to.equal(itemNames[index])
    })
  }
}

export const compareItemsPage: CompareItemsPage = new CompareItemsPage()
