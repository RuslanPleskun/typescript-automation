function extractNumberFromText (text: string): number {
  return parseFloat(text.replace(/[^\d.]/g, ''))
}

export class ShoppingCartPage {
  private get item () {
    return cy.get('.text>.wrap')
  }

  private get itemPrice () {
    return cy.get('.product_qty_price .price-box__cur')
  }

  private get totalPrice () {
    return cy.get('.total-box .total-box__price')
  }

  private get itemInTheShoppingCart () {
    return cy.get('.product__item .vi__close.remove')
  }

  public verifyFirstItemPresence (itemName: string) {
    this.item.first().should('contain.text', itemName)
  }

  public verifySecondItemPresence (itemName: string) {
    this.item.last().should('contain.text', itemName)
  }

  public removeFirstItemFromShoppingCart () {
    this.itemInTheShoppingCart.first().click()
  }

  public verifyNumberOfItemsOnThePage (numberOfItems: number) {
    this.item.should('have.length', numberOfItems)
  }

  public verifyItemAbsense (itemName: string) {
    this.item.should('not.contain', itemName)
  }

  /**
   * This method verifies if the price that user see on the page
   * is correctly displayed
   */
  public verifyTotalPriceOfItems () {
    this.itemPrice.then(($prices) => {
      const price1 = extractNumberFromText($prices.eq(0).text())
      const price2 = extractNumberFromText($prices.eq(1).text())

      const sum = Number(price1) + Number(price2)

      this.totalPrice.invoke('text').then((text3) => {
        const value = extractNumberFromText(text3)
        const expectedSum = parseInt(value.toString().substring(0, Math.ceil(value.toString().length / 2)))

        expect(sum).to.eq(expectedSum)
      })
    })
  }
}

export const shoppingCartPage = new ShoppingCartPage()
