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
// exports.getOrders = (req, res) => {
//   const sql = "SELECT * FROM orders ORDER BY id DESC";

//   db.query(sql, (err, result) => {
//     if (err) return res.status(500).json(err);

//     const orders = result.map(order => ({
//       ...order,
//   items:
//   typeof order.items === "string"
//     ? JSON.parse(order.items)
//     : order.items
//     }));

//     res.json(orders);
//   });
// };

exports.getOrders = (req, res) => {
  const sql = "SELECT * FROM orders ORDER BY id DESC";

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


//GET ORDER BY ID

// exports.getOrderById = (req, res) => {

//     const sql = "SELECT * FROM orders WHERE id=?";

//     db.query(sql,[req.params.id],(err,result)=>{

//         if(err)
//             return res.status(500).json(err);

//         if(result.length===0)
//             return res.status(404).json({
//                 message:"Order not found"
//             });

//         if (typeof result[0].items === "string") {
//   result[0].items = JSON.parse(result[0].items);
// }

//         res.json(result[0]);

//     });

// };

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

//UPDATE ORDER STATUS

exports.updateOrderStatus = (req,res)=>{
   const { id } = req.params;
    const {status}=req.body;

    const sql="UPDATE orders SET status=? WHERE id=?";

    db.query(sql,[status,req.params.id],(err)=>{

        if(err)
            return res.status(500).json(err);

        res.json({
            message:"Status updated"
        });

    });

};