// created for checkout.html
// Here, we will save needed data, generate the html for it, make the page interactive
// We are going to reuse same data structure style as in amazon.js, which is cart = [{ id: id, quantity: number}]
// We will use two .forEach() to dynamically display the html
// One cart.forEach(item) { products.forEach(){ } }
// The cart.forEach(item) will loop through every item in the cart 
// The products.forEach() will loop through products and find a matching id with the item in cart (item.id)...if (product.id === item.id) { this is our product/item}

import { cart } from "../data/cart.js"
import { listOfProducts } from "../data/listOfProducts.js"
import { convertToCashFormat } from "./utils/strToCashFormat.js"
import { rmItemFromCartArr } from "../data/cart.js";

//           //           //            GENERATING CART HTML SUMMARY            //           //           //            

let cartSummary = '';
cart.forEach((cartItem) => {
  let matchedProd;

  listOfProducts.forEach((prod) => {
    if (prod.id === cartItem.id) {
      matchedProd = prod;
    }
  })

  cartSummary +=
    ` <div class="cart-item-container js-cart-item-container-${matchedProd.id}">
        <div class="delivery-date">
          Delivery date: Wednesday, June 15
        </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchedProd.image}">

        <div class="cart-item-details">
          <div class="product-name">
          ${matchedProd.name}
          </div>
          <div class="product-price">
          $${convertToCashFormat(matchedProd.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-btn" data-prdct-id='${matchedProd.id}'>
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>

          <div class="delivery-option">
            <input type="radio" class="delivery-option-input"
              name="delivery-option-${matchedProd.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input"
              name="delivery-option-${matchedProd.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" class="delivery-option-input"
              name="delivery-option-${matchedProd.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

document.querySelector('.js-dom-order-summary').innerHTML = cartSummary
// console.log(cartSummary);

//           //           //            RUN fnc AT START OF WEBPAGE LOAD            //           //           //  

updateCartQuantityCheckoutPage();  

//           //           //            CLICKING DELETE BUTTON            //           //           //    

document.querySelectorAll('.js-delete-btn')
  .forEach((delBtn) => {
    delBtn.addEventListener('click', () => {
      // console.log(delBtn.dataset.prdctId)
      let id = delBtn.dataset.prdctId
      rmItemFromCartArr(id);
      // console.log(cart);

      let yeetThisContainer = document.querySelector(`.js-cart-item-container-${id}`) 
      // console.log(yeetThisContainer)
      // delBtn.remove(yeetThisContainer) durys emes eshek! :D
      yeetThisContainer.remove(); //.remove() is a built in method to remove an HTML element 

      console.log("MANQA")
      updateCartQuantityCheckoutPage()
    })
  })

//           //           //            CALC QT OF ITEMS IN CART AND DISPLAY            //           //           //    

function updateCartQuantityCheckoutPage() {
  console.log("RUNNING")
  // calculating total quantity of items in cart to display at top of checkout page
  let runningTotQt = 0;
  cart.forEach((item) => {
    runningTotQt += item.quantity
  })
  document.querySelector('.js-checkout-header-return-home-link-displayQt').innerHTML = runningTotQt + ' items'
  // console.log('Tot items in cart: ' + runningTotQt);
}