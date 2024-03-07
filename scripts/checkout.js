// created for checkout.html
// Here, we will save needed data, generate the html for it, make the page interactive
// We are going to reuse same data structure style as in amazon.js, which is cart = [{ id: id, quantity: number}]
// We will use two .forEach() to dynamically display the html
// One cart.forEach(item) { products.forEach(){ } }
// The cart.forEach(item) will loop through every item in the cart 
// The products.forEach() will loop through products and find a matching id with the item in cart (item.id)...if (product.id === item.id) { this is our product/item}

import { cart, rmItemFromCartArr, calcCartQt, updQtAfterSaving } from "../data/cart.js"
import { listOfProducts } from "../data/listOfProducts.js"
import { convertToCashFormat } from "./utils/strToCashFormat.js"

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
              Quantity: <span class="quantity-label js-qt-display-area-${matchedProd.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-upd-btn" data-prdct-id='${matchedProd.id}'>
              Update
            </span>
            <input class="quantity-input js-input-${matchedProd.id}">
            <span class="save-qt link-primary js-save-btn" data-prdct-id='${matchedProd.id}'>Save</span>
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


//           //           //            PRESSING ENTER AFTER PRESSING UPDATE          //           //           //    
document.querySelectorAll(`.quantity-input`).forEach((inputBox) => {
  inputBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      console.log('hit')
      //trigger save
    }
  })
})



//           //           //            SAVE BUTTON CLICKED           //           //           //    
//doing opposite of update, grab id of specific product (via HTMLelement.dataset.nameCamelCase), then grab save btn element, add eventListener to each save btn, on click: grab the ([id-specific] parent container "js-cart-item-container") and remove the class name "is-editing-quantity" from it. This should reverse all the css styling that was applied when clicking update to edit the quantity of items for a specific product
document.querySelectorAll('.js-save-btn').forEach((saveBtn) => {
  saveBtn.addEventListener('click', () => {
    //0. Actually go up to the html generation area, put data-prdct-id = 'DOLLARSIGN{matchedProd.id}' near class names for save html element
    //1. get id, we will need it to know which specific product we clicked on
    let id = saveBtn.dataset.prdctId;
    //2. Grab parent container
    let crtContainer = document.querySelector(`.js-cart-item-container-${id}`);
    //3. Remove class name "is-editing-quantity" from that specific container. W/o this step, we would be stuck with old css styles. 
    crtContainer.classList.remove('is-editing-qt');

    //         //        GRAB USER's INPUT FOR NEW QT AMOUNT + CHANGE HTML PAGE APPEARANCE        //        //   
    let qnt;
    function getValueFromUserInput() {
      //1) Created a new class manually in the html generation section (A seperate second name (specifically for js) so as to not screw up the css linked to first class name). One of my mistakes was not creating this new unique class (unique b/c id is associated with it). 
      //2) Grab value from user input using HTMLElement.value; 
      let val = document.querySelector(`.js-input-${id}`).value;
      // alert(val);

      // 2.5)               INPUT VALIDATION: type: a number 1-1000        //        // 
      let previousVal = document.querySelector(`.js-qt-display-area-${id}`).innerHTML;
      let x = val
      if (isNaN(x) || x < 0 || x > 999) {
        alert("Input not valid. Please note that the new quantity must be a numeric value within the range of 0-999.");
        return previousVal;
      } else {
        // alert("Input OK");
        return x;
      }
    };

    qnt = getValueFromUserInput()
    qnt;
    console.log(typeof (qnt)) //string 
    //3) qnt is currently in string value format bc input accepts user value as string. So change qnt into a Number by using Number(qnt)
    let quant = Number(qnt);
    //console.log(typeof(quant)) //number 

    //4) Create a new class in the html geneartion (label area - where the qt is shown). Again, this is so as to not screw up the css styling linked to first name. One of my mistakes was not creating this new unique class (unique b/c id is associated with it). 
    //5) Change the HTML appearance on the page for the qt
    document.querySelector(`.js-qt-display-area-${id}`).innerHTML = quant;

    //         //        UPD CART WITH NEW QT        //        // 
    //1. Pass on id and new qt to a function that we created in cart.js but then imported into this checkout.js file
    updQtAfterSaving(id, quant);

    //         //        UPD HTML PAGE APPEARANCE AT TOP OF PAGE (TOT AMOUNT OF PRODS IN CART)      //        // 
    updateCartQuantityCheckoutPage() //gonna need later
  })
});


//           //           //            CLICK UPDATE BUTTON           //           //           //    
document.querySelectorAll('.js-upd-btn').forEach((updBtn) => {
  updBtn.addEventListener('click', () => {
    let id = updBtn.dataset.prdctId;
    console.log(id);

    //grab the update parent container
    let ctainer = document.querySelector(`.js-cart-item-container-${id}`);
    //add another class name ("is-editing-qt") to the '.js-cart-item-container' container above. This way we can show a custom css style when upd is clicked on
    ctainer.classList.add('is-editing-qt')
  })
})


//           //           //            CLICK DELETE BUTTON           //           //           //   
document.querySelectorAll('.js-delete-btn')
  .forEach((delBtn) => {
    delBtn.addEventListener('click', () => {
      // console.log(delBtn.dataset.prdctId)
      let id = delBtn.dataset.prdctId
      rmItemFromCartArr(id); //this one actually removes the item from cart array
      // console.log(cart);

      let yeetThisContainer = document.querySelector(`.js-cart-item-container-${id}`) //while this removes the html displaying this item on checkout.hmtl page
      // console.log(yeetThisContainer)
      // delBtn.remove(yeetThisContainer) durys emes eshek! :D
      yeetThisContainer.remove(); //.remove() is a built in method to remove an HTML element 

      console.log("MANQA")
      updateCartQuantityCheckoutPage()
    })
  })

//           //           //            CALC QT OF ITEMS IN CART AND DISPLAY            //           //           //    
function updateCartQuantityCheckoutPage() {
  let qt = calcCartQt();
  document.querySelector('.js-checkout-header-return-home-link-displayQt')
    .innerHTML = qt + ' items'
}

//           //           //            RUN fnc AT START OF WEBPAGE LOAD            //           //           //  
updateCartQuantityCheckoutPage();