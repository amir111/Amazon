import { cart, addToCart, updCartFromLocStorage } from "../../data/cart.js";

describe("Test Suite 1, AddToCart", () => {

  //      //      //      TEST 1 (aka SPEC 1)      //      //      //

  it("Test name1, The IF statement, Adds an ALREADY EXISTING item as +1 to cart qt", () => {
    
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([{
        id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }])
    })
    
    updCartFromLocStorage(); //Q: WHY DO WE NEED THIS IS WE HAVE SPYON FOR LOCALSTORAGE GETITEM AND SETITEM? 

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    //only thing diff: Qnty should be 2 bc we're adding +1 to an already EXISTING item
    expect(cart[0].quantity).toEqual(2)
  });

  //      //      //      TEST 2 (aka SPEC 2)      //      //      //

  it("Test name2, The Else condition, Add a NEW, not previously found item to qt", () => {
    //created mock of localStorage.setItem() bc we don't want the orig code to be altered. Don't want localStorage actually saving anything from test code.
    //Can't see what localStorage.setItem has, only if has been called or not. If called, .toHaveBeenCalledTimes() gives # of times it was called using spyOn
    spyOn(localStorage, 'setItem');

    //mocking (aka overwriting) localStorage.getItem() and overwriting it to return what we want (and we want an empty array for now)
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    // console.log(localStorage.getItem('cart')) //ans: []

    //after the mock, which returns an empty array, then we call updCartFromLocStorage(). Which means we are overwriting not just for Jasmine testing, but the original localStorage fnc as well. localStorage will be an empty array...[in orig code: cart = JSON.parse(localStorage.getItem('anyName')); ]
    updCartFromLocStorage();

    // using a fnc from cart.js file. Since js is global and we imported the addToCart() fnc, we have access to utilizing it.
    // call the addToCart fnc, then use a test prodID as a param. Use a test prodID, so grab any prodID from data/listOfProducts.js file. 
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);

    //expect gives object, and object has some features it can use (like above .toEqual()) or in this case, .toHaveBeenCalledTimes()
    //this will only work if localStorage.setItem has been spyOn()-ed. It will show how many times the localStorage.setItem has been called
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    //one test (aka spec), can have several expect(). And the test will only pass if ALL expects() successfully pass. 

    //checking to make sure the first product has correct id 
    expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    //checking to make sure the quantity of the first product added to cart is 1 
    expect(cart[0].quantity).toEqual(1)
  });
});