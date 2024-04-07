import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary, daHtml } from "./checkout/paymentSummary.js";

renderOrderSummary();
renderPaymentSummary();
daHtml(); //daHtml() all payment calcs on R side of the checkout page