//going to generate the html using js
//each of our products has data (information like: name, img, price etc.)

//creating an array, bc it represents a list. And we have a list of different products. 
//We will use an object to represent each individual product (bc an obj lets us group multiple values(name,img,price) together)

import { cart, addToCart } from "../data/cart.js"
//if you do {cart as myCart} instead of just {cart}, it renames cart as myCart so that you can use the variable name 'cart' again.
import { listOfProducts } from "../data/listOfProducts.js"
import { convertToCashFormat } from "./utils/strToCashFormat.js";

let accumulatedHTML = '';

//how does this amazon.js file know abt the products array from the products.js file? 
listOfProducts.forEach(e => {
  accumulatedHTML += `<div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src=${e.image}>
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${e.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${e.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${e.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${convertToCashFormat(e.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="
      add-to-cart-button 
      button-primary
      js-add-to-cart-btn"
      
      data-atrb-id="${e.id}"
      data-atrb-name="${e.name}"
      >
        Add to Cart
      </button>
    </div>
  `;
});

console.log(accumulatedHTML);

document.querySelector('.js-grid-of-prdts').innerHTML = accumulatedHTML;

function updateCartQt() {
  //display total amount of stuff in the cart
  let totalItemsInCart = 0;
  let qt;
  cart.forEach(item => {
    qt = item.quantity;
    totalItemsInCart += qt;
  })

  console.log(cart)
  console.log("Total quantity of stuff in cart: " + totalItemsInCart)

  document.querySelector(".js-cart-qty").innerHTML = totalItemsInCart;
  // productName: prodName, ??? Why did I add this? accidental typo?
}

document.querySelectorAll('.js-add-to-cart-btn')
  .forEach((eBtn) => {
    eBtn.addEventListener('click', () => {
      //console.log(eBtn.dataset.atrbName) if we clicked the basketball "add to cart" button, this console log will show "Intermediate Size Basketball"
      //.dataset property gives us all the data attributes attached to this btn elt
      //.atrb-name in kebab-style is converted to atrbName camelCase style so we use that converted style. And actually, if it was ".atrb-Name", it would be converted to camelCase "atrbname".
      let prodID = eBtn.dataset.atrbId;
      let prodName = eBtn.dataset.atrbName;

      addToCart(prodID, prodName)
      updateCartQt()
    })
  })
