import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { updCartFromLocStorage } from "../../data/cart.js";

describe('Test suite: renderOrderSummary', () => {
  it('correctly displays the cart', () => {
    document.querySelector(".js-test-container").innerHTML = `<div class="js-dom-order-summary"></div>`;

    //bul ne vashe?
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([{
        id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2, 
        deliveryOptionId: '1'
      }, {
        id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1, 
        deliveryOptionId: '3'
      }])
    })
    updCartFromLocStorage(); //Q: WHY DO WE NEED THIS IS WE HAVE SPYON FOR LOCALSTORAGE GETITEM AND SETITEM? 

    renderOrderSummary();
  })
});