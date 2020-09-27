const { handler } = require("./index");
const requestBody = {
  orderId: "82fd2bd4-6039-487d-bd9f-fda549c4004d",
};
const event = {
  body: JSON.stringify(requestBody),
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
