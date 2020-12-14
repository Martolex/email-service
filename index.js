var aws = require("aws-sdk");
const { Book, Order, OrderItem, User, BookRent } = require("./db");
const db = require("./db/connection");
const BuildOrderEmail = require("./EmailTemplates/orderConfirmation");
const {
  orderReceipt,
  forgotPassword,
  resendPayment,
} = require("./EventHandlers");
const EventTypes = require("./EventTypes");
aws.config.update({ region: "ap-south-1" });
var ses = new aws.SES({ apiVersion: "2010-12-01" });

exports.handler = async function (event, context, callback) {
  try {
    console.log("connecting to db");
    await db.authenticate();
    console.log("connected");
  } catch (err) {
    console.error(err);
  }
  console.log(event.type);
  switch (event.type) {
    case EventTypes.ORDER_RECEIPT:
      await orderReceipt(event, callback, ses);
      break;
    case EventTypes.FORGOT_PASSWORD:
      await forgotPassword(event, callback, ses);
      break;
    case EventTypes.RESEND_PAYMENT_LINK:
      await resendPayment(event, callback, ses);
      break;
    default:
      callback(null, {
        statusCode: 400,
        body: JSON.stringify({ code: 0, message: "invalid event type" }),
      });
  }
};
