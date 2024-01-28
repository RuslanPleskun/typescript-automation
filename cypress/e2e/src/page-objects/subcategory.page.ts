export class SubcategoryPage {

  getPhonesSubcategory() {
    return cy.get('.portal-group__section a');
  }

  selectPhonesSubcategory() {
    this.getPhonesSubcategory().first().click();
  }

  getSubcategory() {
    return cy.get('.portal-group__title a');
  }

  selectSubcategory(subcategory: string) {
    this.getSubcategory().contains(subcategory).click();
  }
}

export const subcategoryPage = new SubcategoryPage();