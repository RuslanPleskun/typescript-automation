export class ItemsPage {
  private get priceInputField ()  {
    return cy.get('[data-range-filter="price"] input')
  }

  private get brand () {
    return cy.get('.f-list.cropped a')
  }

  private get availability () {
    return cy.get('[data-id="available_in_city"].f-check')
  }

  private get showItems () {
    return cy.get('[class="f-popup__message"]')
  }

  private get priceValue () {
    return cy.get('.product-card__buy-box [class="v-pb"] .v-pb__cur')
  }

  private get shoppingCartSign () {
    return cy.get('.products-layout__item .v-btn--cart')
  }

  private get comebackButton () {
    return cy.get('.cart-popup__content .comeback')
  }

  private get cartButton () {
    return cy.get('.mh-cart button')
  }

  private get logo () {
    return cy.get('.mh__sr .v-logo')
  }

  private get itemTitle () {
    return cy.get('.product-card__content')
  }

  private getAddToCompareIcon (itemName: string) {
    return cy.get(`[title="${itemName}"]`).siblings('.product-card__main').find('.compare svg')
  }

  private get compareItemButton () {
    return cy.get('.mh-button.mh-compare')
  }

  public enterPriceFrom (price: number) {
    this.priceInputField.first().click()
    this.priceInputField.first().clear()
    this.priceInputField.first().type(price.toString())
  }

  public enterPriceTo (price: number) {
    this.priceInputField.last().click()
    this.priceInputField.last().clear()
    this.priceInputField.last().type(price.toString())
  }

  public selectBrand (brand: string) {
    this.brand.contains(brand).click()
  }

  public selectAvailableInCityOption () {
    this.availability.click()
  }

  public showFilteredItems (popupName: string) {
    this.showItems.contains(popupName).click()
  }

  public addFirstShownItemToShoppingCart () {
    this.shoppingCartSign.first().click()
  }

  public clickComebackButton () {
    this.comebackButton.click()
  }

  public addItemToCompareList (itemName: string) {
    this.getAddToCompareIcon(itemName).click()
  }

  public verifySearchedItems (textToBePresentOnItem: string) {
    this.itemTitle.each(($element) => {
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
    this.priceValue.then(($elements) => {
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
    this.logo.click()
  }

  public gotoShoppingCartPage () {
    this.cartButton.click()
  }

  public gotoCompareItemsPage () {
    this.compareItemButton.click()
  }
}

export const itemsPage: ItemsPage = new ItemsPage()
