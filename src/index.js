var aws = require("aws-sdk");
const { Book, Order, OrderItem, User, BookRent } = require("./db");
const BuildOrderEmail = require("./EmailTemplates/orderConfirmation");
const { orderReceipt, forgotPassword } = require("./EventHandlers");
const EventTypes = require("./EventTypes");
aws.config.update({ region: "ap-south-1" });
var ses = new aws.SES({ apiVersion: "2010-12-01" });

exports.handler = async function (event, context, callback) {
  console.log(event.type);
  switch (event.type) {
    case EventTypes.ORDER_RECEIPT:
      orderReceipt(event, callback, ses);
      break;
    case EventTypes.FORGOT_PASSWORD:
      forgotPassword(event, callback, ses);
      break;
    default:
      callback(null, {
        statusCode: 400,
        body: JSON.stringify({ code: 0, message: "invalid event type" }),
      });
  }
};
