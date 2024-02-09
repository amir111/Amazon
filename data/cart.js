export const cart = []

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