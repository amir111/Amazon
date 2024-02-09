//going to generate the html using js
//each of our products has data (information like: name, img, price etc.)

//creating an array, bc it represents a list. And we have a list of different products. 
//We will use an object to represent each individual product (bc an obj lets us group multiple values(name,img,price) together)

import {cart as myCart} from "../data/cart.js"
//renames cart as myCart so that you can use the name variable cart again

let accumulatedHTML = '';

//how does this amazon.js file know abt the products array from the products.js file? 
products.forEach(e => {
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
        $${(e.priceCents / 100).toFixed(2)}
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

document.querySelectorAll('.js-add-to-cart-btn').forEach((eBtn) => {
  eBtn.addEventListener('click', () => {
    // alert('just making sure this works message')

    //console.log(eBtn.dataset.atrbName) if we clicked the basketball "add to cart" button, this console log will show "Intermediate Size Basketball"
    //.dataset property gives us all the data attributes attached to this btn elt
    //.atrb-name in kebab-style is converted to atrbName camelCase style so we use that converted style. And actually, if it was ".atrb-Name", it would be converted to camelCase "atrbname".

    let prodID = eBtn.dataset.atrbId;
    let prodName = eBtn.dataset.atrbName;

    let repeatedItem = false;
    let i; //declared outside of forEach so, that it can be used again

    cart.forEach((item) => {
      if (prodID === item.id) { //does it exist in the cart?
        repeatedItem = true; //if so, then define repeatedItem as current item
        i = item; //store item in 'i' for later use
        // console.log(item)
      }
    })

    if (repeatedItem) { //if repeatedItem exits, add +1 to the items qt
      i.quantity++; //if we just use item.quantity++, it'll say item not defined
    } else { //else create that item in the cart
      cart.push({
        id: prodID,
        productName: prodName,
        quantity: 1
      })
    }

    //just added this to display total amount of stuff in the cart
    let totalItemsInCart = 0;
    let qt;
    cart.forEach(item => {
      qt = item.quantity;
      totalItemsInCart += qt;
    })

    console.log(cart)
    console.log("Total quantity of stuff in cart: " + totalItemsInCart)

    document.querySelector(".js-cart-qty").innerHTML = totalItemsInCart;
  })
})
