//This is the page the creates the home page (you can see all producst in grid pattern, with amazon banner at the top)

//going to generate the html using js
//each of our products has data (information like: name, img, price etc.)

//creating an array, bc it represents a list. And we have a list of different products. 
//We will use an object to represent each individual product (bc an obj lets us group multiple values(name,img,price) together)

import { cart, addToCart, calcCartQt } from "../data/cart.js"
//if you do {cart as myCart} instead of just {cart}, it renames cart as myCart so that you can use the variable name 'cart' again.
import { listOfProducts } from "../data/listOfProducts.js"
import convertToCashFormat from "./utils/strToCashFormat.js";

let accumulatedHTML = '';

//how does this amazon.js file know abt the products array from the products.js file? bc we imported it via modules
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
          src="${e.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${e.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${e.getPrice()}
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

//run fnc upon page load
updateCartQt()

function updateCartQt() {
  let qt = calcCartQt()
  document.querySelector(".js-cart-qty").innerHTML = qt;
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
