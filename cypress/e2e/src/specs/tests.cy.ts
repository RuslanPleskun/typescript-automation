import { mainPage } from '../page-objects/main.page'
import { itemsPage } from '../page-objects/items.page'
import { subcategoryPage } from '../page-objects/subcategory.page'
import { shoppingCartPage } from '../page-objects/shopping-cart.page'
import { compareItemsPage } from '../page-objects/compare-items.page'

describe('Test Cases for Allo App', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.log('Step 1: Open marketplace url. Verify it.')
    cy.url().should('eq', Cypress.config('baseUrl'))
    cy.fixture('test-data.json').then(function (data) {
      this.data = data;
    })
  })

  it('Verify if the price filter working correctly for the following marketplaces', function () {
    cy.log('Step 2: Open category and subcategory if it is necessary.')
    mainPage.selectCategory(this.data.PHONES_CATEGORY)
    subcategoryPage.selectPhonesSubcategory()

    cy.log('Step 3: Navigate to the filters section, for the following marketplaces it is located on the left side. Apply 2-3 filters.')
    itemsPage.enterPriceFrom(this.data.PHONE_FROM_PRICE)
    itemsPage.enterPriceTo(this.data.PHONE_TO_PRICE)
    itemsPage.selectBrand(this.data.XIAOMI_BRAND)
    itemsPage.selectAvailableInCityOption()
    itemsPage.showFilteredItems(this.data.SHOW)

    cy.log('Step 4: Verify that all the items on the page are sorted correctly by the "from" and "to" price filters you entered.')
    itemsPage.verifyFilterCorrectness(this.data.PHONE_FROM_PRICE, this.data.PHONE_TO_PRICE)
  })

  it('Add items to the basket', function () {
    cy.log('Step 2: Open category and subcategory if it is necessary.')
    mainPage.selectCategory(this.data.PHONES_CATEGORY)
    subcategoryPage.selectPhonesSubcategory()

    cy.log('Step 3: Add any item to the basket.')
    itemsPage.addFirstShownItemToShoppingCart()
    itemsPage.clickComebackButton()

    cy.log('Step 4: Select another category and add an item from that category.')
    itemsPage.gotoMainPage()
    mainPage.selectCategory(this.data.LAPTOPS_CATEGORY)
    subcategoryPage.selectSubcategory(this.data.LAPTOPS_SUBCATEGORY)
    itemsPage.addFirstShownItemToShoppingCart()
    itemsPage.clickComebackButton()

    cy.log('Step 5: Verify information of items inside the basket.')
    itemsPage.gotoShoppingCartPage()
    shoppingCartPage.verifyFirstItemPresence(this.data.XIAOMI_REDMI_NOTE)
    shoppingCartPage.verifySecondItemPresence(this.data.XIAOMI_REDMI_BOOK)

    cy.log('Step 6: Verify that the price is calculated correctly.')
    shoppingCartPage.verifyTotalPriceOfItems()

    cy.log('Step 7: Verify that the delete item button is clickable.')
    shoppingCartPage.removeFirstItemFromShoppingCart()
    shoppingCartPage.verifyNumberOfItemsOnThePage(this.data.SINGLE_ITEM)
    shoppingCartPage.verifyItemAbsense(this.data.XIAOMI_REDMI_NOTE)
  })

  it.skip('Search the item', function () {
    cy.log('Step 2: Search random item by name.')
    mainPage.searchItem(this.data.IPHONE15_PRO_MAX)

    cy.log('Step 3: Verify that all items are correctly displayed according to your searching request (only on the first page).')
    itemsPage.verifySearchedItems(this.data.IPHONE15_PRO_MAX) // Defect here, sort functionality does not work properly
  })

  it('Add items to the Comparison List', function () {
    cy.log('Step 2: Verify that the comparison button is disabled when user opens application.')
    mainPage.verifyThatCompareButtonIsDisabled()

    cy.log('Step 3: Add at least 3 items to the comparison list.')
    mainPage.selectCategory(this.data.PHONES_CATEGORY)
    subcategoryPage.selectPhonesSubcategory()
    itemsPage.addItemToCompareList(this.data.ITEM_TITLES_FOR_COMPARISON[0])
    itemsPage.addItemToCompareList(this.data.ITEM_TITLES_FOR_COMPARISON[1])
    itemsPage.addItemToCompareList(this.data.ITEM_TITLES_FOR_COMPARISON[2])

    cy.log('Step 4: Open Comparison List page.')
    itemsPage.gotoCompareItemsPage()

    cy.log('Step 5: Verify that the correct items were added to the list.')
    compareItemsPage.verifyThatTheCorrectItemsWereAddedToTheList(this.data.ITEM_TITLES_FOR_COMPARISON)

    cy.log('Step 6: Verify that the item can be removed from the list.')
    compareItemsPage.removeFirstItem()
    itemsPage.gotoCompareItemsPage()
    compareItemsPage.verifyNumberOfItemsLeft(this.data.NUMBER_OF_ITEMS_IN_COMPARISON_LIST)
    compareItemsPage.verifyAbsenseOfItem(this.data.ITEM_TITLES_FOR_COMPARISON[0])
  })
})
