const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");
// transporter.verify((error, success) => {
//   if (error) {
//     console.log("SMTP VERIFY ERROR:");
//     console.log(error);
//   } else {
//     console.log("SMTP Server Ready");
//   }
// });

const sendOrderStatusEmail = async (
  email,
  customerName,
  orderId,
  status,
  discountType,
  discountValue,
  gstPercentage,
  gstAmount,
  finalTotal
) => {
  let subject = "";
  let message = "";

  switch (status) {
   case "Accepted":

subject = "Your Order has been Accepted";

let discountSection = "";

if (Number(discountValue) > 0) {
  if (discountType === "Percentage") {
    discountSection = `

🎉 Special Discount

Dear ${customerName},

We have applied a ${discountValue}% discount to your order.

Final Total : £${finalTotal}
`;
  } else {
    discountSection = `

🎉 Special Discount

Dear ${customerName},

We have applied a £${discountValue} discount to your order.

Final Total : £${finalTotal}
`;
  }
}

message = `
Hello ${customerName},

🎉 Great News!

Your order #${orderId} has been accepted.
${discountSection}
GST (${gstPercentage}%) : £${gstAmount}

Final Total : £${finalTotal}

We are preparing your order for shipment.

Thank you for shopping with Pennymead.

Regards,
Pennymead Team
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

console.log("Sending email...");
console.log("To:", email);
console.log("Subject:", subject);

try {
  const info = await transporter.sendMail({
    from: `"Pennymead" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    text: message,
  });

  console.log("SUCCESS");
  console.log(info);
} catch (err) {
  console.log("SENDMAIL ERROR");
  console.log(err);
}
};

module.exports = {
  sendOrderStatusEmail,
};