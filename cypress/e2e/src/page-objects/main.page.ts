export class MainPage {
  private get category () {
    return cy.get('#js-menu-wrapper a')
  }

  public selectCategory (category: string) {
    this.category.contains(category).click()
  }

  private get priceInputField () {
    return cy.get('[data-range-filter="price"] input')
  }

  private get searchField () {
    return cy.get('#search-form__input')
  }

  private get compareButton () {
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

  public searchItem (itemName: string) {
    this.searchField.click()
    this.searchField.clear()
    this.searchField.type(itemName).type('{enter}')
  }

  public verifyThatCompareButtonIsDisabled () {
    this.compareButton.should('have.class', 'disabled')
  }
}

export const mainPage: MainPage = new MainPage()
