const { handler } = require("./index");
const requestBody = {
  orderId: "ce9ebbd7-1ac0-448e-8a37-1056f8a6ea75",
};
const event = {
  body: requestBody,
};

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
