import { mainPage } from "../page-objects/main.page";
import { itemsPage } from "../page-objects/items.page";
import { subcategoryPage } from "../page-objects/subcategory.page";
import { shoppingCartPage } from "../page-objects/shopping-cart.page";
import { compareItemsPage } from "../page-objects/compare-items.page";


describe('Test Cases for Allo App', () => {
  
  beforeEach(() => {
    cy.visit('/');
    cy.log('Step 1: Open marketplace url. Verify it.');
    cy.url().should('eq', Cypress.config('baseUrl'));
  });

  it('Verify if the price filter working correctly for the following marketplaces', () => {
    cy.fixture('test-data').then((data) => {
      cy.log('Step 2: Open category and subcategory if it is necessary.');
      mainPage.selectCategory(data.PHONES_CATEGORY);
      subcategoryPage.selectPhonesSubcategory();

      cy.log('Step 3: Navigate to the filters section, for the following marketplaces it is located on the left side. Apply 2-3 filters.');
      itemsPage.enterPriceFrom(data.PHONE_FROM_PRICE);
      itemsPage.enterPriceTo(data.PHONE_TO_PRICE);
      itemsPage.selectBrand(data.XIAOMI_BRAND);
      itemsPage.selectAvailableInCityOption();
      itemsPage.showFilteredItems(data.SHOW);

      cy.log('Step 4: Verify that all the items on the page are sorted correctly by the "from" and "to" price filters you entered.');
      itemsPage.verifyFilterCorrectness(data.PHONE_FROM_PRICE, data.PHONE_TO_PRICE);
    });
  });

  it('Add items to the basket', () => {
    cy.fixture('test-data').then((data) => {
      cy.log('Step 2: Open category and subcategory if it is necessary.');
      mainPage.selectCategory(data.PHONES_CATEGORY);
      subcategoryPage.selectPhonesSubcategory();

      cy.log('Step 3: Add any item to the basket.');
      itemsPage.addFirstShownItemToShoppingCart();
      itemsPage.clickComebackButton();

      cy.log('Step 4: Select another category and add an item from that category.');
      itemsPage.gotoMainPage();
      mainPage.selectCategory(data.LAPTOPS_CATEGORY);
      subcategoryPage.selectSubcategory(data.LAPTOPS_SUBCATEGORY);
      itemsPage.addFirstShownItemToShoppingCart();
      itemsPage.clickComebackButton();

      cy.log('Step 5: Verify information of items inside the basket.');
      itemsPage.gotoShoppingCartPage();
      shoppingCartPage.verifyFirstItemPresence(data.XIAOMI_REDMI_NOTE);
      shoppingCartPage.verifySecondItemPresence(data.XIAOMI_REDMI_BOOK);

      cy.log('Step 6: Verify that the price is calculated correctly.');
      shoppingCartPage.verifyTotalPriceOfItems();

      cy.log('Step 7: Verify that the delete item button is clickable.');
      shoppingCartPage.removeFirstItemFromShoppingCart();
      shoppingCartPage.verifyNumberOfItemsOnThePage(data.SINGLE_ITEM);
      shoppingCartPage.verifyItemAbsense(data.XIAOMI_REDMI_NOTE);
    });
  });

  it.skip('Search the item', () => {
    cy.fixture('test-data').then((data) => {
      cy.log('Step 2: Search random item by name.');
      mainPage.searchItem(data.IPHONE15_PRO_MAX);

      cy.log('Step 3: Verify that all items are correctly displayed according to your searching request (only on the first page).');
      itemsPage.verifySearchedItems(data.IPHONE15_PRO_MAX);       // Defect here, sort functionality does not work properly
    });
  });

  it('Add items to the Comparison List', () => {
    cy.fixture('test-data').then((data) => {
      cy.log('Step 2: Verify that the comparison button is disabled when user opens application.');
      mainPage.verifyThatCompareButtonIsDisabled();

      cy.log('Step 3: Add at least 3 items to the comparison list.');
      mainPage.selectCategory(data.PHONES_CATEGORY);
      subcategoryPage.selectPhonesSubcategory();
      itemsPage.addItemToCompareList(data.ITEM_TITLES_FOR_COMPARISON[0]);
      itemsPage.addItemToCompareList(data.ITEM_TITLES_FOR_COMPARISON[1]);
      itemsPage.addItemToCompareList(data.ITEM_TITLES_FOR_COMPARISON[2]);

      cy.log('Step 4: Open Comparison List page.');
      itemsPage.gotoCompareItemsPage();

      cy.log('Step 5: Verify that the correct items were added to the list.');
      compareItemsPage.verifyThatTheCorrectItemsWereAddedToTheList(data.ITEM_TITLES_FOR_COMPARISON);

      cy.log('Step 6: Verify that the item can be removed from the list.');
      compareItemsPage.removeFirstItem();
      itemsPage.gotoCompareItemsPage();
      compareItemsPage.verifyNumberOfitemsLeft(data.NUMBER_OF_ITEMS_IN_COMPARISON_LIST);
      compareItemsPage.verifyAbsenseOfItem(data.ITEM_TITLES_FOR_COMPARISON[0]);
    });
  })
});
