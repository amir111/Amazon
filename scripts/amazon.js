//going to generate the html using js
//each of our products has data (information like: name, img, price etc.)

//creating an array, bc it represents a list. And we have a list of different products. 
//We will use an object to represent each individual product (bc an obj lets us group multiple values(name,img,price) together)
let products = [{
  img: "images/products/athletic-cotton-socks-6-pairs.jpg",
  name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
  rating: {
    stars: 4.5,
    countReview: 87
  },
  priceCents: 1090
  // calculate in cents, b/c JS has a problem with decimal points (floats) so the best practice for calculating money, is to calculate it in cents. We also made sure the save the value of 'priceCents' instead of just 'price'.
}, {
  img: "images/products/intermediate-composite-basketball.jpg",
  name: "Intermediate Size Basketball",
  rating: {
    stars: 4,
    countReview: 127
  },
  priceCents: 2095
}, {
  img: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
  name: "Adults Plain Cotton T-Shirt - 2 Pack",
  rating: {
    stars: 4.5,
    countReview: 56
  },
  priceCents: 799
}];

let accumulatedHTML = '';

products.forEach(e => {
  accumulatedHTML += `<div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src=${e.img}>
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${e.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${e.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${e.rating.countReview}
        </div>
      </div>

      <div class="product-price">
        $${(e.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary">
        Add to Cart
      </button>
    </div>
  `; 
});

console.log(accumulatedHTML);

document.querySelector('.js-grid-of-prdts').innerHTML = accumulatedHTML;