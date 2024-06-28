import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { updCartFromLocStorage } from "../../data/cart.js";

//       //       Checks if page rendered correctly       //       //
describe('Test suite: renderOrderSummary', () => {
  it('correctly displays the cart', () => {
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
    updCartFromLocStorage(); //Q: WHY DO WE NEED THIS IF WE HAVE SPYON FOR LOCALSTORAGE GETITEM AND SETITEM? 

    renderOrderSummary();

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
  })

  // 
  it('new test to see if delete btn works', () => {
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

    //new method called .click(), which will click delete btn, thus rmving elt
    document.querySelector(`.test-js-delete-link-${prodId1}`).click()
  })
});