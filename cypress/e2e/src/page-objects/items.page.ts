export class ItemsPage {
  private getPriceInputField ()  {
    return cy.get('[data-range-filter="price"] input')
  }

  private getBrand () {
    return cy.get('.f-list.cropped a')
  }

  private getAvailability () {
    return cy.get('[data-id="available_in_city"].f-check')
  }

  private getShowItems () {
    return cy.get('[class="f-popup__message"]')
  }

  private getPriceValue () {
    return cy.get('.product-card__buy-box [class="v-pb"] .v-pb__cur')
  }

  private getShoppingCartSign () {
    return cy.get('.products-layout__item .v-btn--cart')
  }

  private getComebackButton () {
    return cy.get('.cart-popup__content .comeback')
  }

  private getCartButton () {
    return cy.get('.mh-cart button')
  }

  private getLogo () {
    return cy.get('.mh__sr .v-logo')
  }

  private getItemTitle () {
    return cy.get('.product-card__content')
  }

  private getAddToCompareIcon (itemName: string) {
    return cy.get(`[title="${itemName}"]`).siblings('.product-card__main').find('.compare svg')
  }

  private getCompareItemButton () {
    return cy.get('.mh-button.mh-compare')
  }

  public enterPriceFrom (price: number) {
    this.getPriceInputField().first().click()
    this.getPriceInputField().first().clear()
    this.getPriceInputField().first().type(price.toString())
  }

  public enterPriceTo (price: number) {
    this.getPriceInputField().last().click()
    this.getPriceInputField().last().clear()
    this.getPriceInputField().last().type(price.toString())
  }

  public selectBrand (brand: string) {
    this.getBrand().contains(brand).click()
  }

  public selectAvailableInCityOption () {
    this.getAvailability().click()
  }

  public showFilteredItems (popupName: string) {
    this.getShowItems().contains(popupName).click()
  }

  public addFirstShownItemToShoppingCart () {
    this.getShoppingCartSign().first().click()
  }

  public clickComebackButton () {
    this.getComebackButton().click()
  }

  public addItemToCompareList (itemName: string) {
    this.getAddToCompareIcon(itemName).click()
  }

  public verifySearchedItems (textToBePresentOnItem: string) {
    this.getItemTitle().each(($element) => {
      cy.wrap($element).should('contain.text', textToBePresentOnItem)
    })
  }

  /**
   * This method is taking all the prices on the page in range (priceFrom, priceFrom)
   * and checks whether no item the price of which is out of this range is present
   * on the page
   * @param {number} priceFrom - bottom price boundary
   * @param {number} priceTo - top price bundary
   */
  public verifyFilterCorrectness (priceFrom: number, priceTo: number) {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000) // This delay is necessary here for page rendering
    this.getPriceValue().then(($elements) => {
      const pricesArray = $elements.map((index, element) => {
        const priceText = Cypress.$(element).text()
        const price = priceText.replace(/[^0-9.]/g, '').trim()
        return price
      }).get()

      cy.wrap(pricesArray).should((prices) => {
        const condition = prices.every((price) => price >= priceFrom.toString() && price <= priceTo.toString())
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(condition, 'Prices should be within the specified range').to.be.true
      })
    })
  }

  public gotoMainPage () {
    this.getLogo().click()
  }

  public gotoShoppingCartPage () {
    this.getCartButton().click()
  }

  public gotoCompareItemsPage () {
    this.getCompareItemButton().click()
  }
}

export const itemsPage: ItemsPage = new ItemsPage()
