//Using localStorage to get/save cart state when changing page to page (i.e. from home page to checkout page and back again)
export let cart = JSON.parse(localStorage.getItem('anyName'))

//            //            //            DEFAULT CREATION OF CART            //            //            //

//if cart does NOT exist, make a default list of items, by assigning this arrOfObjs to cart
if (!cart) {
  cart = [{
    id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2, 
    deliveryOptionId: '1'
  }, {
    id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1, 
    deliveryOptionId: '3'
  }];
}

//            //            //            SAVING TO LOCALSTORAGE           //            //            //

//creating localStorage.setItem('name', thingToSave) to save state of cart. Remember that localStorage only stores strings. So convert our object to a str via JSON.stringify(theArrOfObjs);
function saveToStorage() {
  localStorage.setItem('anyName', JSON.stringify(cart));
}

//            //            //            ADDING AN ITEM TO CART            //            //            //

export function addToCart(prodID, prodName) {
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
    i.quantity++; //note: if we type "item.quantity++", it'll say item not defined. B/c item is local to forEach but 'i' was declared outside of forEach, and since forEach already ran, 'i' currently contains item's value.
  } else { //else create that item in the cart ...also added default delivery option deliveryOptionID: '1'
    cart.push({
      id: prodID,
      productName: prodName,
      quantity: 1, 
      deliveryOptionId: '1'
    })
  }

  //cart was altered, so save state in localStorage
  saveToStorage();
}

//            //            //            RM AN ITEM FROM CART            //            //            //

export function rmItemFromCartArr(theItemID) {
  let newCartArr = []; //1. needed to create a whole new fresh cart array, but w/o the unwanted cart item

  //2. push everything onto the new cart that was prev created, except the unwanted cart item
  cart.forEach((item) => {
    if (item.id !== theItemID) {
      newCartArr.push(item)
    }
  })

  //3. update cart with new arr order
  cart = newCartArr; 

  //4. cart was altered, so save state in localStorage
  saveToStorage();
}

//            //            //            CALC TOT QT OF ALL ITEMS IN CART           //            //            //

export function calcCartQt() {
  let runningTotQt = 0;
  cart.forEach((item) => {
    runningTotQt += item.quantity
  })
  return runningTotQt;
}

//            //            //            UPD NEW QT AFTER CLICKING/PRESSING ENTER ON SAVE            //            //            //

export function updQtAfterSaving(prodID, newQt) { //0. Export the function from cart.js and import it into the checkout.html file
  //1. Recieve product ID and the new quantity

  //2. Find our product according to id using a cart.forEach(()=>{ if(id === id){}}) method
  let matchedProduct;
  cart.forEach(cartItem => {
    if (cartItem.id === prodID){
      matchedProduct = cartItem;
    }
  })
  //3. Now that we have found our matched product. Upd it's qt to the newQt.
  matchedProduct.quantity = newQt;

  //4. And don't forget to save all this into local memory
  saveToStorage();
}