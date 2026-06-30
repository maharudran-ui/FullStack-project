const db = require("../config/db");



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

// console.log(req.body);
// console.log("Total Price:", total_price);

  const sql = `
    INSERT INTO orders
    (email, name, address1, address2, city, phone, state, zip, country, payment_method, notes, items, total_price, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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

// GET ALL ORDERS
exports.getOrders = (req, res) => {
  const sql = "SELECT * FROM orders ORDER BY id ASC";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.status(200).json(result);
  });
};