import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { updCartFromLocStorage, cart } from "../../data/cart.js";

//       //       Checks if page rendered correctly       //       //
describe('Test suite: renderOrderSummary', () => {

  //beforeEach() is a built-in Jasmine func that calls another fnc inside of it. That inner fnc will have code that we want to run before each of our tests. 
  //beforeEach() hook allows us to share code and decrease redundant code duplication
  beforeEach(() => {
    //mocking localStorage.setItem
    spyOn(localStorage, 'setItem')

    // this part was previously getting me stuck with error cannot set null .innerHTML, so just added the two missing classes below
    document.querySelector('.js-test-container').innerHTML = `
    <div class="js-dom-order-summary"></div>
    <div class="js-checkout-header-return-home-link-displayQt"></div>
    <div class="js-payment-summary"></div>
    `;

    const prodId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
    const prodId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        id: prodId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        id: prodId2,
        quantity: 1,
        deliveryOptionId: '3'
      }])
    })
    updCartFromLocStorage();

    renderOrderSummary();
  })

  //              //              //              Suite 1, Test 1              //              //              //
  it('correctly displays the cart', () => {
    const prodId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
    const prodId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'

    //check if you have two elts on page
    expect(
      document.querySelectorAll('.test-js-cart-item-container').length
      //gives an arr of elts 
      //add .length to end of it, and then .toEqual(2) at end of this expect
      //to check if length = 2, which will mean two elts are on page
    ).toEqual(2)

    //expect (thisElt.innerText) contains, anywhere, the following (thisExactString)
    expect(
      document.querySelector(`.test-js-product-quantity-${prodId1}`).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(`.test-js-product-quantity-${prodId2}`).innerText
    ).toContain('Quantity: 1');

    //              //              Removal of html on test page that opens up, for prettiness              //              //
    //html is not displayed on the page anymore. 
    //Recommended not to rm the html while testing so you can physically see elements being properly displayed, deleted, counted etc.
    document.querySelector('.js-test-container').innerHTML = ``;
  })

  //              //              //              Suite 1, Test 2              //              //              //
  it('new test to see if delete btn works', () => {
    const prodId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
    const prodId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'

    //new property called .click(), which will click delete btn, thus rmving elt
    document.querySelector(`.test-js-delete-btn-${prodId1}`).click();

    expect(
      document.querySelectorAll('.test-js-cart-item-container').length
    ).toEqual(1);

    //check that first prod was deleted off the page (searching for it should equal null)
    expect(
      document.querySelector(`.js-cart-item-container-${prodId1}`)
    ).toEqual(null);

    //check to make sure second item is still on the page
    //here is a new property we use called .not ,,,and .not.equal(null) means we are making sure that the elt is not null (which means it exists), thus it exist on the page.
    expect(
      document.querySelector(`.js-cart-item-container-${prodId2}`).length
    ).not.toEqual(null)

    //     //     //     CART     //     //     //
    //now we'll check if cart is updating properly 

    //first check that the cart array is the length of 1
    expect(cart.length).toEqual(1)

    //second check to make sure the cart's first item's id is equal to prodId2
    expect(cart[0].id).toEqual(prodId2);
  })
});