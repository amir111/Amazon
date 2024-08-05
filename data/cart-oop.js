//Object Orientated Programming = putting all fncs and data into objs

function Cart(localStorageKey) {
  let cart = {
    cartItemz: undefined,
  
    updCartFromLocStorage() {
      //'anyName-oop' so we don't alter the old localStorage
      //^actually we swapped out the old 'anyName-oop' to a customizable localStorageKey
      //bc if we use 'anyName-oop', it'll give the same 3 items in cart to every type of cart that calls the obj Cart(),
      //which is bad bc every cart should be custom and individual, and the parameter passed into the obj Cart(), localStorageKey will be diff according to the type of cart calling Cart() obj, instead of always being 'anyName-oop'
      //we also changed 'anyName-oop' in saving to local storage just below the default creation of cart
      this.cartItemz = JSON.parse(localStorage.getItem(localStorageKey))
      //this.cartItemz is the same as cart.cartItemz
  
      // DEFAULT CREATION OF CART
      if (!this.cartItemz) {
        this.cartItemz = [{
          id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        }, {
          id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '3'
        }];
      }
    },
    
    // SAVING TO LOCALSTORAGE
    //oop, declaring it inside this obj
    //swapped 'anyName-oop' with localStorageKey
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItemz));
    },
  
    // ADDING AN ITEM TO CART
    addToCart(prodID, prodName) {
      let repeatedItem = false;
      let i; //declared outside of forEach so, that it can be used again
    
      this.cartItemz.forEach((item) => {
        if (prodID === item.id) { //does it exist in the cart?
          repeatedItem = true; //if so, then define repeatedItem as current item
          i = item; //store item in 'i' for later use
          // console.log(item)
        }
      });
    
      if (repeatedItem) { //if repeatedItem exits in the cart, add +1 to the items qt
        i.quantity++; //note: if we type "item.quantity++", it'll say item not defined. B/c item is local to forEach but 'i' was declared outside of forEach, and since forEach already ran, 'i' currently contains item's value.
      } else { //else create that item in the cart ...also added default delivery option deliveryOptionID: '1'
        this.cartItemz.push({
          id: prodID,
          productName: prodName,
          quantity: 1,
          deliveryOptionId: '1'
        });
      }
    
      //cart was altered, so save state in localStorage
      //accessing a declared method inside of this outer obj
      this.saveToStorage();
    },
  
    // RM AN ITEM FROM CART
    rmItemFromCartArr(theItemID) {
      let newCartArr = []; //1. needed to create a whole new fresh cart array, but w/o the unwanted cart item
    
      //2. push everything onto the new cart that was prev created, except the unwanted cart item
      this.cartItemz.forEach((item) => {
        if (item.id !== theItemID) {
          newCartArr.push(item)
        }
      })
    
      //3. update cart with new arr order
      this.cartItemz = newCartArr;
    
      //4. cart was altered, so save state in localStorage
      //oop
      this.saveToStorage();
    },
  
    // CALC TOT QT OF ALL ITEMS IN CART 
    calcCartQt() {
      let runningTotQt = 0;
      this.cartItemz.forEach((item) => {
        runningTotQt += item.quantity
      })
      return runningTotQt;
    },
  
    // UPD NEW QT AFTER CLICKING/PRESSING ENTER ON SAVE
    updQtAfterSaving(prodID, newQt) { //0. Export the function from cart.js and import it into the checkout.html file
      //1. Recieve product ID and the new quantity
    
      //2. Find our product according to id using a cart.forEach(()=>{ if(id === id){}}) method
      let matchedProduct;
      this.cartItemz.forEach(cartItem => {
        if (cartItem.id === prodID) {
          matchedProduct = cartItem;
        }
      })
      //3. Now that we have found our matched product. Upd it's qt to the newQt.
      matchedProduct.quantity = newQt;
    
      //4. And don't forget to save all this into local memory
      this.saveToStorage();
    },
  
    // UPDATING THE DELIVERY OPTION (making deliv options on checkout.js page interactive)
    // To upd a delivery option, we need to know the 1. Product to update, and 2. Chosen delivery option 
    updDelivOption(prodId, delivId) {
      let theCorrectCartItem; //declared outside of forEach so, that it can be used again
    
      this.cartItemz.forEach((cartItem) => {
        if (prodId === cartItem.id) { //find theCorrectCartItem by going thru every cart item and comparing the passed in prodId id
          theCorrectCartItem = cartItem;
        }
      });
    
      //Look at the cart, and you will see that each cart item has a property called 'deliveryOptionId'
      //Sooo, we want to just update/change that item's property with the delivId that was passed into this function
      theCorrectCartItem.deliveryOptionId = delivId;
    
      //save to local stor (just saves cart as it currently is in local storage)
      this.saveToStorage()
    }
  };

  return cart;
}

let regularShoppingCart = Cart('anyName-oop'); 
let bizCart = Cart('anyName-oop-biz');
//sending diff args to Cart(), thus we can have diff keys in localSt, thus, allowing us to have diff data per cart

// call upon start, so it runs at least 1x 
//oop, added `cart.` to the front to call some function that was declared inside the oop Object called Cart()
regularShoppingCart.updCartFromLocStorage(); 
bizCart.updCartFromLocStorage(); 

// bizCart.addToCart('54e0eccd-8f36-462b-b68a-8182611d9add', '2 Slot Toaster - Black')
// bizCart.rmItemFromCartArr('54e0eccd-8f36-462b-b68a-8182611d9add')
console.log(regularShoppingCart);
console.log(bizCart);

//                 //                 Old stuff (b4 putting everthing into a large funtion that creates obj template)                 //                 //
// //seperate cart for seperate business side of Amazon website

// let businessCart = {
//   cartItemz: undefined,

//   updCartFromLocStorage() {
//     //'anyName-oop-biz' so we don't alter any other localStorage memories
//     this.cartItemz = JSON.parse(localStorage.getItem('anyName-oop-biz'))

//     // DEFAULT CREATION OF CART
//     if (!this.cartItemz) {
//       this.cartItemz = [{
//         id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//         quantity: 2,
//         deliveryOptionId: '1'
//       }, {
//         id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
//         quantity: 1,
//         deliveryOptionId: '3'
//       }];
//     }
//   },
  
//   // SAVING TO LOCALSTORAGE
//   //oop, declaring it inside this obj
//   saveToStorage() {
//     localStorage.setItem('anyName-oop-biz', JSON.stringify(this.cartItemz));
//   },

//   // ADDING AN ITEM TO CART
//   addToCart(prodID, prodName) {
//     let repeatedItem = false;
//     let i; //declared outside of forEach so, that it can be used again
  
//     this.cartItemz.forEach((item) => {
//       if (prodID === item.id) { //does it exist in the cart?
//         repeatedItem = true; //if so, then define repeatedItem as current item
//         i = item; //store item in 'i' for later use
//         // console.log(item)
//       }
//     });
  
//     if (repeatedItem) { //if repeatedItem exits in the cart, add +1 to the items qt
//       i.quantity++; //note: if we type "item.quantity++", it'll say item not defined. B/c item is local to forEach but 'i' was declared outside of forEach, and since forEach already ran, 'i' currently contains item's value.
//     } else { //else create that item in the cart ...also added default delivery option deliveryOptionID: '1'
//       this.cartItemz.push({
//         id: prodID,
//         productName: prodName,
//         quantity: 1,
//         deliveryOptionId: '1'
//       });
//     }
  
//     //cart was altered, so save state in localStorage
//     //accessing a declared method inside of this outer obj
//     this.saveToStorage();
//   },

//   // RM AN ITEM FROM CART
//   rmItemFromCartArr(theItemID) {
//     let newCartArr = []; //1. needed to create a whole new fresh cart array, but w/o the unwanted cart item
  
//     //2. push everything onto the new cart that was prev created, except the unwanted cart item
//     this.cartItemz.forEach((item) => {
//       if (item.id !== theItemID) {
//         newCartArr.push(item)
//       }
//     })
  
//     //3. update cart with new arr order
//     this.cartItemz = newCartArr;
  
//     //4. cart was altered, so save state in localStorage
//     //oop
//     this.saveToStorage();
//   },

//   // CALC TOT QT OF ALL ITEMS IN CART 
//   calcCartQt() {
//     let runningTotQt = 0;
//     this.cartItemz.forEach((item) => {
//       runningTotQt += item.quantity
//     })
//     return runningTotQt;
//   },

//   // UPD NEW QT AFTER CLICKING/PRESSING ENTER ON SAVE
//   updQtAfterSaving(prodID, newQt) { //0. Export the function from cart.js and import it into the checkout.html file
//     //1. Recieve product ID and the new quantity
  
//     //2. Find our product according to id using a cart.forEach(()=>{ if(id === id){}}) method
//     let matchedProduct;
//     this.cartItemz.forEach(cartItem => {
//       if (cartItem.id === prodID) {
//         matchedProduct = cartItem;
//       }
//     })
//     //3. Now that we have found our matched product. Upd it's qt to the newQt.
//     matchedProduct.quantity = newQt;
  
//     //4. And don't forget to save all this into local memory
//     this.saveToStorage();
//   },

//   // UPDATING THE DELIVERY OPTION (making deliv options on checkout.js page interactive)
//   // To upd a delivery option, we need to know the 1. Product to update, and 2. Chosen delivery option 
//   updDelivOption(prodId, delivId) {
//     let theCorrectCartItem; //declared outside of forEach so, that it can be used again
  
//     this.cartItemz.forEach((cartItem) => {
//       if (prodId === cartItem.id) { //find theCorrectCartItem by going thru every cart item and comparing the passed in prodId id
//         theCorrectCartItem = cartItem;
//       }
//     });
  
//     //Look at the cart, and you will see that each cart item has a property called 'deliveryOptionId'
//     //Sooo, we want to just update/change that item's property with the delivId that was passed into this function
//     theCorrectCartItem.deliveryOptionId = delivId;
  
//     //save to local stor (just saves cart as it currently is in local storage)
//     this.saveToStorage()
//   }
// };

// call upon start, so it runs at least 1x 
//oop, added `cart.` to the front to call some function that was declared inside the oop variable 'cart'
// cart.updCartFromLocStorage();
//same for businessCart
// businessCart.updCartFromLocStorage();

// console.log(cart)
// console.log(businessCart)