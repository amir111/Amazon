import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderBeforeTax, renderFinalTot, renderJustTax, renderPaymentSummary, renderTotShippingPrice } from "./checkout/paymentSummary.js";

renderOrderSummary();
renderPaymentSummary();
renderTotShippingPrice();
renderBeforeTax();
renderJustTax();
renderFinalTot();