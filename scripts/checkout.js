import { renderOrderSummary } from "./checkout/orderSummary.js";
import { daHtml, renderBeforeTax, renderFinalTot, renderJustTax, renderPaymentSummary, renderTotShippingPrice } from "./checkout/paymentSummary.js";

renderOrderSummary();
renderPaymentSummary();
renderTotShippingPrice();
renderBeforeTax();
renderJustTax();
renderFinalTot();
daHtml();