import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary, daHtml } from "./checkout/paymentSummary.js";

// import '../data/cart-class.js' just used this file for practice, classes

renderOrderSummary();
renderPaymentSummary();
daHtml(); //daHtml() all payment calcs on R side of the checkout page