//saving the data
export let cart = [{
  id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2
}, {
  id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}];

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
}

export function rmItemFromCartArr(theItemID) {
  let newCartArr = []; //needed to create a whole new fresh cart array, but w/o the unwanted cart item

  cart.forEach((item) => {
    if (item.id !== theItemID) {
      newCartArr.push(item)
    }
  })

  cart = newCartArr; //update cart with new arr order
}