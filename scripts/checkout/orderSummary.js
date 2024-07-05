// created for checkout.html
// Here, we will save needed data, generate the html for it, make the page interactive
// We are going to reuse same data structure style as in amazon.js, which is cart = [{ id: id, quantity: number}]
// We will use two .forEach() to dynamically display the html
// One cart.forEach(item) { products.forEach(){ } }
// The cart.forEach(item) will loop through every item in the cart 
// The products.forEach() will loop through products and find a matching id with the item in cart (item.id)...if (product.id === item.id) { this is our product/item}

//        //       NORMAL/"NAMED" EXPORTS 
import { cart, rmItemFromCartArr, calcCartQt, updQtAfterSaving, updDelivOption } from "../../data/cart.js";
import { listOfProducts } from "../../data/listOfProducts.js";
import { daHtml } from "./paymentSummary.js";
import convertToCashFormat from "../utils/strToCashFormat.js";

// Importing ext lib via import inside the checkout.js file
// (Instead of using script tags in the checkout.html file)
// B/c this ext library has something called an ESM VERSION (which allows you to use JS MODULES)...look below line 28 to find comment abt ESM Versions.
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";

//        //       DEFAULT EXPORT 
//we don't have the {} here, b/c this syntax (w/o {}) is called a "default import". We use it when we only want to import one thing from a file. 
//also, it doesn't work if you have the {} braces around 'dayjs'
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import deliveryOptions from "../../data/deliveryOptions.js";

//Above: So, again the dayjs library ONLY exports ONE THING, so they chose to use a 'default export' instead of a normal export. 
//You can choose whatever type of export you want. But you must know both types. B/c when using external libs, some libs use a "normal (aka named) exports", and others will have a "default export". 
//IF an external lib doesn't have an esm version, then just use <script> tags
// ESM VERSION ALLOWS YOU TO USE JS MODULES and import directly into .js file (instead of using <script> tags in the .html file that is required in libs that do not have esm versions.)

//renderOrderSummary() is the whole left area 'Review your order', w/the item picture, delivery date, item name, price, qt, and delivery options. 
export function renderOrderSummary() {
  //           //           //            GENERATING CART HTML SUMMARY            //           //           //            
  let cartSummary = '';

  cart.forEach((cartItem) => {
    let matchedProd;

    listOfProducts.forEach((prod) => {
      if (prod.id === cartItem.id) {
        matchedProd = prod;
      }
    })

    let matchedChoice;
    //looping thru an array (aka list) to assign the chosen delivery option of days
    //to a variable called matchedChoice 
    deliveryOptions.forEach(listItem => {
      if (listItem.id === cartItem.deliveryOptionId) {
        matchedChoice = listItem;
      }
    });

    let bugingiKun = dayjs(); //today's date
    let dayOfArrival = bugingiKun.add(matchedChoice.deliveryDays, 'days');
    let durysFormat = dayOfArrival.format('dddd, MMMM D');

    cartSummary +=
      ` <div class="
          cart-item-container 
          test-js-cart-item-container
          js-cart-item-container-${matchedProd.id}
        ">
          <div class="delivery-date">
            Delivery date: ${durysFormat}
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
            <div class="
              product-quantity
              test-js-product-quantity-${matchedProd.id}
            ">
              <span>
                Quantity: <span class="quantity-label js-qt-display-area-${matchedProd.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-upd-btn" data-prdct-id='${matchedProd.id}'>
                Update
              </span>
              <input class="quantity-input js-input-${matchedProd.id}" data-prdct-id='${matchedProd.id}'>
              <span class="save-qt link-primary js-save-btn" data-prdct-id='${matchedProd.id}'>Save</span>
              <span class="
              delete-quantity-link 
              link-primary 
              js-delete-btn
              test-js-delete-btn-${matchedProd.id}
              " 
              data-prdct-id='${matchedProd.id}'>
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchedProd, cartItem)}
          </div>
        </div>
      </div>
    `;
  });
  //           //           //            RUN ONCE AT START OF WEBPAGE LOAD, DISPLAYS L Side Checkout Page            //           //           // 
  document.querySelector('.js-dom-order-summary').innerHTML = cartSummary
  // console.log(cartSummary);


  //           //           //            Create HTML 3 deliv optns For each Product in Cart           //           //           // 
  //for each delivery option, create some html
  function deliveryOptionsHTML(matchedProd, cartItem) {
    let html = '';

    //will run 3 times, since there are 3 objects in the array deliveryOptions
    deliveryOptions.forEach(deliveryOpt => {
      let rn = dayjs(); //today's date
      let delivDate = rn.add(deliveryOpt.deliveryDays, 'days');
      let formattedDateStr = delivDate.format('dddd, MMMM D');

      let priceString = deliveryOpt.priceCents === 0 ? 'FREE' : `$${convertToCashFormat(deliveryOpt.priceCents)}`;

      //obj.id is the delivery id
      //if " deliveryOpt.id === cartItem.deliveryOptionId" is T, then make 'isChecked' equal to true, else make 'isChecked' equal to false.
      let isChecked = deliveryOpt.id === cartItem.deliveryOptionId ? true : false;

      //added data attributes so that we can grab specific details, like the product id and the delivery id that were selected and the bottom of page in a querySelectorAll that calls a function in cart.js
      html += `
        <div class="delivery-option js-deliv-opt"
          data-product-id="${matchedProd.id}"
          data-deliv-id="${deliveryOpt.id}">
          <input type="radio" 
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchedProd.id}">
          <div>
            <div class="delivery-option-date">
              ${formattedDateStr}
            </div>
            <div class="delivery-option-price">
              ${priceString} - Shipping
            </div>
          </div>
        </div>
      `
    })

    return html;
  }

  //           //           //            PRESSING ENTER AFTER PRESSING UPDATE          //           //           //    
  document.querySelectorAll(`.quantity-input`).forEach((inputBox) => {
    inputBox.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        // console.log('hit')
        //trigger save
        let id = inputBox.dataset.prdctId
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
      //add another class name ("is-editing-qt") to the '.js-cart-item-container' container above. This way we can show a custom css style upon clicking update
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

        // daHtml(); //wasn't working earlier? but now does? Anyways, moved inside the updateCartQuantityCheckoutPage(), b/c that way all the event btns on the page will trigger the refresh of the page (delete btn, save btn, update btn, change of delivery option)
      })
    })

  //           //           //            CALC QT OF ITEMS IN CART AND DISPLAY AT TOP PAGE          //           //           //    
  function updateCartQuantityCheckoutPage() {
    //CALC QT OF ITEMS IN CART AND DISPLAY (L SIDE OF PAGE)
    let qt = calcCartQt();
    document.querySelector('.js-checkout-header-return-home-link-displayQt').innerHTML = qt + ' items';

    // added later on 
    // REFRESHES ALL PRICE CALCS ON THE (R SIDE OF CHECKOUT PAGE)
    daHtml();
  }

  //           //           //            RUN fnc AT START OF WEBPAGE LOAD            //           //           //  
  updateCartQuantityCheckoutPage();

  //           //           //            Event listener for changing the delivery day           //           //           //  
  document.querySelectorAll('.js-deliv-opt').forEach((radioBtn) => {
    radioBtn.addEventListener('click', () => {
      //1. Upd deliv option id in the cart 
      //Then 2. Upd the page

      //hold the id of the product that was selected by user
      let prodId = radioBtn.dataset.productId
      //hold the delivery id (choice 1,2or3) that was selected by user
      let delivId = radioBtn.dataset.delivId

      //upd the id of deliveryOptionId inside of cart
      updDelivOption(prodId, delivId)

      // Now, refresh the page (i.e. upd the page)
      // updateCartQuantityCheckoutPage(); //you can also call daHtml() which will do the same
      // daHtml();
      // Finally changed to renderOrderSummary func, instead of calling updateCartQuantityCheckoutPage() or daHtml(), b/c those fncs don't change the L side of screen on top each product where it displays interactively with each radio btn pressed - "Delivery Date: Date".
      renderOrderSummary();
    })
  });
}