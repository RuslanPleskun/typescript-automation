export class SubcategoryPage {
  getPhonesSubcategory (): Cypress.Chainable<JQuery> {
    return cy.get('.portal-group__section a')
  }

  selectPhonesSubcategory (): void {
    this.getPhonesSubcategory().first().click()
  }

  getSubcategory (): Cypress.Chainable<JQuery> {
    return cy.get('.portal-group__title a')
  }

  selectSubcategory (subcategory: string): void {
    this.getSubcategory().contains(subcategory).click()
  }
}

export const subcategoryPage = new SubcategoryPage()
