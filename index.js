var aws = require("aws-sdk");
var nodemailer = require("nodemailer");
const { Book, Order, OrderItem, User, BookRent } = require("./db");
const BuildOrderEmail = require("./EmailTemplates/orderConfirmation");
aws.config.update({ region: "ap-south-1" });
var ses = new aws.SES();

exports.handler = async function (event, context, callback) {
  let requestBody = JSON.parse(event.body);
  if (!requestBody.orderId) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({ code: 0, message: "orderId not available" }),
    });
    console.log("here");
    return;
  }
  const orderDetails = await Order.findByPk(requestBody.orderId, {
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
  console.log(orderDetails.toJSON());

  var mailOptions = {
    from: "info@martolex.com",
    subject: "Order Confirmation",
    html: BuildOrderEmail(orderDetails),
    to: orderDetails.user.email,
  };
  // console.log(mailOptions);

  // // create Nodemailer SES transporter
  var transporter = nodemailer.createTransport({
    SES: ses,
  });

  // send email
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log("Error sending email");
      callback(err);
    } else {
      console.log("Email sent successfully");
      callback();
    }
  });
};
