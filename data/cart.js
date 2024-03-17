//Using localStorage to get/save cart state when changing page to page (i.e. from home page to checkout page and back again)
export let cart = JSON.parse(localStorage.getItem('anyName'))

//if cart does NOT exist, assign this arrOfObjs to cart
if (!cart) {
  cart = [{
    id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2, 
    deliveryOptionID: '1'
  }, {
    id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1, 
    deliveryOptionID: ''
  }];
}

//creating localStorage.setItem('name', thingToSave) to save state of cart. Remember that localStorage only stores strings. So convert our object to a str via JSON.stringify(theArrOfObjs);
function saveToStorage() {
  localStorage.setItem('anyName', JSON.stringify(cart));
}

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
    i.quantity++; //if we just use item.quantity++, it'll say item not defined
  } else { //else create that item in the cart
    cart.push({
      id: prodID,
      productName: prodName,
      quantity: 1
    })
  }

  //cart was altered, so save state in localStorage
  saveToStorage();
}

export function rmItemFromCartArr(theItemID) {
  let newCartArr = []; //needed to create a whole new fresh cart array, but w/o the unwanted cart item

  cart.forEach((item) => {
    if (item.id !== theItemID) {
      newCartArr.push(item)
    }
  })

  cart = newCartArr; //update cart with new arr order

  //cart was altered, so save state in localStorage
  saveToStorage();
}

export function calcCartQt() {
  let runningTotQt = 0;
  cart.forEach((item) => {
    runningTotQt += item.quantity
  })
  return runningTotQt;
}

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