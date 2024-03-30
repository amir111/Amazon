import { listOfProducts } from "../../data/listOfProducts.js";
import { cart } from "../../data/cart.js";
import convertToCashFormat from "../utils/strToCashFormat.js";

export function renderPaymentSummary() {
  let itemTots = 0;
  cart.forEach(cartItem => {
    // console.log('hank') will execute as many times, as there are items inside cart
    let matchedProd
    listOfProducts.forEach(listItem => {
      if (listItem.id === cartItem.id) {
        matchedProd = listItem;
      }
    });

    itemTots += matchedProd.priceCents * cartItem.quantity
    console.log("itemTots: " + itemTots) //just checking
    console.log("TYPE: " + typeof(itemTots))
  })
  // itemTots now holds in priceCents the amount owed, before shipping and tax 
  return itemTots; 
};

// for each product, qt * price = itemsTot
// have running total of itemsTot? Yep, I guessed correctly

//Steps for calc the pretax/preshipping total order tot:
//1. Loop cart, get items
//let itemsTot
//2. forEach(product => {itemsTot = qt * priceOfProduct})


//     //     //     //       Shipping Price TOT       //     //     //     //

//Loop cart 
//Add all shipping costs together 
export function renderTotShippingPrice() {
  let totShipPrice = 0;
  cart.forEach(cartItem => {
    if (cartItem.deliveryOptionId === '2') {
      totShipPrice += 499;
    } else if (cartItem.deliveryOptionId === '3') {
      totShipPrice += 999;
    }
  });
  console.log("Tot Ship Price: " + totShipPrice);
  return totShipPrice;
}; 

export function renderBeforeTax() {
  let beforeTax = 0; 
  let itemTots = renderPaymentSummary(); 
  let totShipPrice = renderTotShippingPrice(); 

  // console.log("---itemTots: " + itemTots);  
  // console.log("---totShipPrice: " + totShipPrice);
  
  beforeTax = itemTots + totShipPrice
  console.log("Tot before tax: " + beforeTax);
  return beforeTax;
}

export function renderJustTax() {
  let justTax = 0;
  let beforeTax = renderBeforeTax(); 

  justTax = beforeTax*.1
  console.log("JUST TAX: " + justTax);
  return justTax;
}

export function renderFinalTot() {
  let tot = 0; 
  let beforeTax = renderBeforeTax(); 
  let taxMan = renderJustTax();
  let c = beforeTax + taxMan;
  tot = convertToCashFormat(c)
  console.log("FINAL TOTAL: " + tot)
  return tot;
}