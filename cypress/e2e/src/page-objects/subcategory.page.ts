export class SubcategoryPage {
  private get phonesSubcategory () {
    return cy.get('.portal-group__section a')
  }

  private get subcategory () {
    return cy.get('.portal-group__title a')
  }

  public selectPhonesSubcategory () {
    this.phonesSubcategory.first().click()
  }

  public selectSubcategory (subcategory: string) {
    this.subcategory.contains(subcategory).click()
  }
}

export const subcategoryPage: SubcategoryPage = new SubcategoryPage()
