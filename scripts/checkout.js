// created for checkout.html
// Here, we will save needed data, generate the html for it, make the page interactive
// We are going to reuse same data structure style as in amazon.js, which is cart = [{ id: id, quantity: number}]
// We will use two .forEach() to dynamically display the html
// One cart.forEach(item) { products.forEach(){ } }
// The cart.forEach(item) will loop through every item in the cart 
// The products.forEach() will loop through products and find a matching id with the item in cart (item.id)...if (product.id === item.id) { this is our product/item}

import { cart } from "../data/cart.js"
import { listOfProducts } from "../data/products.js"
import { convertToCashFormat } from "./utils/money.js"

let cartSummary = '';

cart.forEach((cartItem) => {
  let matchedProd;

  listOfProducts.forEach((prod) => {
    if (prod.id === cartItem.id) {
      matchedProd = prod;
    }
  })

  cartSummary +=
    ` <div class="cart-item-container">
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
            <span class="delete-quantity-link link-primary">
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
              name="delivery-option-2">
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
              name="delivery-option-2">
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
              name="delivery-option-2">
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

document.querySelector(".js-dom-order-summary").innerHTML = cartSummary

// console.log(cartSummary);