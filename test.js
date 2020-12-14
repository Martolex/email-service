const EventTypes = require("./EventTypes");
const { handler } = require("./index");
const OrderRecieptRequestBody = {
  type: "ORDER_RECEIPT",
  orderId: "ce9ebbd7-1ac0-448e-8a37-1056f8a6ea75",
};

const ForgotPasswordRequestBody = {
  type: "FORGOT_PASSWORD",
  email: "vanganideepanshu@gmail.com",
  link: "https://www.google.com",
};

const resendPaymentLink = {
  type: EventTypes.RESEND_PAYMENT_LINK,
  orderId: "a3f0f91f-0dd1-4a79-9f87-f516d9c28535",
  paymentLink: "https://www.google.com/",
};
const event = resendPaymentLink;

const context = JSON.stringify({ string: "abcd" });
try {
  handler(event, context, function (err, response) {
    if (err) {
      throw err;
    }
    console.log(response);
    return;
  });
} catch (err) {
  throw err;
}
