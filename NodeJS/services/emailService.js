const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOrderStatusEmail = async (
  email,
  customerName,
  orderId,
  status
) => {
  let subject = "";
  let message = "";

  switch (status) {
    case "Accepted":
      subject = "Your Order has been Accepted";

      message = `
Hello ${customerName},

Your order #${orderId} has been accepted.

We are preparing it for shipment.

Thank you for shopping with Pennymead.
`;

      break;

    case "Shipped":
      subject = "Your Order has been Shipped";

      message = `
Hello ${customerName},

Your order #${orderId} has been shipped.

It is on the way.

Thank you for shopping with Pennymead.
`;

      break;

    case "Delivered":
      subject = "Your Order has been Delivered";

      message = `
Hello ${customerName},

Your order #${orderId} has been delivered.

We hope you enjoy your purchase.

Thank you for shopping with Pennymead.
`;

      break;

    case "Cancelled":
      subject = "Your Order has been Cancelled";

      message = `
Hello ${customerName},

Unfortunately your order #${orderId} has been cancelled.

Please contact us if you have any questions.

Thank you.
`;

      break;

    default:
      return;
  }

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    text: message,
  });
};

module.exports = {
  sendOrderStatusEmail,
};