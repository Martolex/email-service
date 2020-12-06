const { Order, BookRent, OrderItem, Book, User } = require("../db");
const buildOrderEmail = require("../EmailTemplates/orderConfirmation");

module.exports = async (event, callback, ses) => {
  if (!event.orderId) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({ code: 0, message: "orderId not available" }),
    });
    return;
  }
  const orderDetails = await Order.findByPk(event.orderId, {
    attributes: ["deliveryAmount"],
    include: [
      {
        model: OrderItem,
        as: "items",
        include: {
          model: Book,
          as: "book",
          attributes: ["name"],
          include: { model: BookRent, as: "rent" },
        },
      },
      { model: User, as: "user", attributes: ["email"] },
    ],
  });

  if (!orderDetails) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({ code: 0, message: "orderId not valid" }),
    });
    return;
  }

  var params = {
    Destination: {
      ToAddresses: [orderDetails.user.email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: buildOrderEmail(orderDetails),
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Order Confirmation",
      },
    },
    Source: "Order Confirmation <info@martolex.com>",
  };

  try {
    await ses.sendEmail(params).promise();

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ code: 1, message: "email sent" }),
    });
  } catch (err) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        code: 0,
        message: "email not sent",
        err: err.message,
      }),
    });
  }
};
