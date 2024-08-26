//oop continued...but now using a Class, to generate objs
//b/c it's cleaner than using a fnc to generate objs

//Class, we give it properties and methods
//Every obj we generate using the CartClass will have it's properties and methods 

class CartClass {
  //adding cartItemz as a property to CartClass
  cartItemz = undefined;
  //adding a prop called localStorageKey to every Obj we create
  #localStorageKey = undefined; //the "#" hash sign, means that localStorageKey is a private property 

  //classes have a special feature called a constructor, it auto runs when an obj is created using a class. 
  //it can take in parameters
  //basically gives setup code for every obj created using class
  //upd, made the p r o p e r t y 'localStorageKey', and the m e t h o d 'updCartFromLocStorage', both private
  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#updCartFromLocStorage();
  }

  //a method 
  //upd, made it private using '#' sign
  #updCartFromLocStorage() {
    this.cartItemz = JSON.parse(localStorage.getItem(this.#localStorageKey))
    //this.cartItemz is the same as cart.cartItemz, "this" keyword is just universal for all objects, (b/c not all objectNames will be 'cart')

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
  };

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItemz));
  };

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
  };

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
  };

  // CALC TOT QT OF ALL ITEMS IN CART 
  calcCartQt() {
    let runningTotQt = 0;
    this.cartItemz.forEach((item) => {
      runningTotQt += item.quantity
    })
    return runningTotQt;
  };

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
  };

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
  };
}


//old way
//let regularShoppingCart = Cart('anyName-oop');
//old way 
// let bizCart = Cart('anyName-oop-biz');

//new way 1a (Class way)
let regularShoppingCart = new CartClass('anyName-oop'); //"regularShoppingCart" is an Object we are creating using the Class 'CartClass'. Inside of this object, there will be methods like rmFromStorage() and others...
//Each objects created using the Class, are called "an instance of the class"
//new way 2a (Class way)
let bizCart = new CartClass('anyName-oop-biz');

//OLD WAY (w/o constructor)
//new way 1b, a prop in CartClass called localStorageKey is currently undefined, so we need to set this property based on what type of cart we are creating (reg or biz carts)
////// regularShoppingCart.localStorageKey = 'anyName-oop';
//new way 2b 
////// bizCart.localStorageKey = 'anyName-oop-biz';

//OLD WAY (w/o constructor)
// call upon start, so it runs at least 1x 
//oop, added `cart.` to the front to call some function that was declared inside the oop Object called Cart()
//loading from storage, then later console.log it
///// regularShoppingCart.updCartFromLocStorage();
///// bizCart.updCartFromLocStorage();


//making sure the private property #localStorageKey cannot be accessed outside the class 'CartClass', by attempting to change the private property, #localStorageKey's value, into the string 'bbb'
// cart.#localStorageKey = 'bbb'; //yep, correctly throws err
// in browser console, 'field' is the same thing as 'property'
// Browser console error will say smtg like: "field '#localStorageKey' must be declared in an enclosing class (at cart-class.js:166:5)"

console.log(regularShoppingCart);
console.log(bizCart);

//to check if obj is instance of a class, use "instanceof"
//see below, for ex:
console.log(bizCart instanceof CartClass) // <- true