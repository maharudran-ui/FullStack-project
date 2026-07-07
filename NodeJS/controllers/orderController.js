const db = require("../config/db");
const { sendOrderStatusEmail } = require("../services/emailService");



// CREATE ORDER
exports.createOrder = (req, res) => {
  console.log(req.body);
  const {
  email,
  name,
  address1,
  address2,
  city,
  phone,
  state,
  zip,
  country,
  payment_method,
  notes,
  items,
  total_price,
} = req.body;



  const sql = `
INSERT INTO orders
(
email,
name,
address1,
address2,
city,
phone,
state,
zip,
country,
payment_method,
notes,
items,
total_price,
discount_type,
discount_value,
gst_percentage,
gst_amount,
final_total,
status
)
VALUES
(
?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
)
`;

  db.query(
    sql,
  [
email,
name,
address1,
address2,
city,
phone,
state,
zip,
country,
payment_method,
notes,
JSON.stringify(items),
total_price,

"Amount",
0,

0,      // GST Percentage
0,      // GST Amount

total_price,

"Pending",
],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        message: "Order placed successfully",
        orderId: result.insertId,
      });
    }
  );
};



exports.getOrders = (req, res) => {
  const sql = "SELECT * FROM orders ORDER BY id ASC";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    const orders = result.map(order => ({
      ...order,
  items:
  typeof order.items === "string"
    ? JSON.parse(order.items)
    : order.items
    }));

    res.json(orders);
  });
};




exports.getOrderById = (req, res) => {

  const sql = "SELECT * FROM orders WHERE id=?";

  db.query(sql, [req.params.id], (err, result) => {

    if (err)
      return res.status(500).json(err);

    if (result.length === 0)
      return res.status(404).json({
        message: "Order not found"
      });

    res.json(result[0]);

  });

};




exports.updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  console.log("Updating Order:", id);
  console.log("New Status:", status);

  const updateSql = "UPDATE orders SET status = ? WHERE id = ?";

  db.query(updateSql, [status, id], (err) => {
    if (err) {
      console.log("Update Error:", err);
      return res.status(500).json(err);
    }

    const getOrderSql = "SELECT * FROM orders WHERE id = ?";

    db.query(getOrderSql, [id], async (err, result) => {
      if (err) {
        console.log("Fetch Error:", err);
        return res.status(500).json(err);
      }

      const order = result[0];

      console.log("Order Email:", order.email);
      console.log("Order Name:", order.name);

      try {
        if (
          status === "Accepted" ||
          status === "Shipped" ||
          status === "Delivered" ||
          status === "Cancelled"
        ) {
          console.log("Calling sendOrderStatusEmail()...");

  await sendOrderStatusEmail(
  order.email,
  order.name,
  order.id,
  status,
  order.discount_type,
  order.discount_value,
  order.gst_percentage,
  order.gst_amount,
  order.final_total
);

          // console.log("Email Sent Successfully");
        }

        res.json({
          message: "Status updated successfully",
        });

      } catch (emailError) {
        console.log("EMAIL ERROR:", emailError);

        res.json({
          message: "Status updated but email could not be sent",
        });
      }
    });
  });
};



exports.updateOrderOffer = (req, res) => {

  const { id } = req.params;

const {
  discount_type,
  discount_value,
  gst_percentage,
} = req.body;

  // Get the original order total
  const getSql =
    "SELECT total_price FROM orders WHERE id = ?";

  db.query(getSql, [id], (err, result) => {

    if (err)
      return res.status(500).json(err);

    if (result.length === 0)
      return res.status(404).json({
        message: "Order not found"
      });

    const total =
      Number(result[0].total_price);

    let finalTotal = total;
    let gstAmount = 0;

    // Amount Discount
    if (discount_type === "Amount") {

      finalTotal =
        total - Number(discount_value);

    }

    // Percentage Discount
    if (discount_type === "Percentage") {

      finalTotal =
        total -
        (total * Number(discount_value)) / 100;

    }

    // Don't allow negative total
  // Don't allow negative total
if (finalTotal < 0)
  finalTotal = 0;

// Calculate GST
gstAmount =
  (finalTotal * Number(gst_percentage)) / 100;

// Add GST
finalTotal =
  finalTotal + gstAmount;

  const updateSql = `
UPDATE orders
SET
discount_type=?,
discount_value=?,
gst_percentage=?,
gst_amount=?,
final_total=?
WHERE id=?
`;

    db.query(
      updateSql,
      [
discount_type,
discount_value,
gst_percentage,
gstAmount,
finalTotal,
id
],
      (err) => {

        if (err)
          return res.status(500).json(err);

      res.json({
  message: "Offer Updated",
  gst_amount: gstAmount,
  final_total: finalTotal
});

      }
    );

  });

};



exports.getOrdersByEmail = (req, res) => {

  const { email } = req.params;

  const sql = `
    SELECT
      id,
      status,
      discount_value,
      gst_amount
      final_total,
      total_price,
      created_at
    FROM orders
    WHERE email = ?
    ORDER BY id DESC
  `;

  db.query(sql, [email], (err, result) => {

    if (err)
      return res.status(500).json(err);

    res.json(result);

  });

};