const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../middlewares/authMiddleware");


exports.register = async (req, res) => {
 const name = req.body.name?.trim();
const email = req.body.email?.trim().toLowerCase();
const password = req.body.password?.trim();
  if (!name || !email || !password) {
  return res.status(400).json({
    message: "Name, email and password are required"
  });
}


const nameRegex = /^[A-Za-z\s]+$/;

if (!nameRegex.test(name)) {
  return res.status(400).json({
    message: "Name can only contain letters and spaces"
  });
}

if (name.length < 3) {
  return res.status(400).json({
    message: "Name must be at least 3 characters"
  });
}
const repeatedCharsRegex = /(.)\1{4,}/;

if (repeatedCharsRegex.test(name)) {
  return res.status(400).json({
    message: "Name contains too many repeated characters"
  });
}

const properNameRegex = /^[A-Z][a-z]+(?:\s[A-Z][a-z]+)*$/;

if (!properNameRegex.test(name)) {
  return res.status(400).json({
    message: "Name must start with a capital letter and follow proper format"
  });
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  return res.status(400).json({
    message: "Invalid email format"
  });
}

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

if (!passwordRegex.test(password)) {
  return res.status(400).json({
    message:
      "Password must contain uppercase, lowercase, number, special character and be at least 8 characters long"
  });
}



  try {
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userRole = "user";

    const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, hashedPassword, userRole], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "Email already exists" });
        }
      console.error(err);

return res.status(500).json({
  message: "Internal Server Error"
});
      }
      res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
  return res.status(400).json({
    message: "Email and password are required"
  });
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  return res.status(400).json({
    message: "Invalid email format"
  });
}

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, result) => {
    if (err) {
  console.error(err);

  return res.status(500).json({
    message: "Internal Server Error"
  });
}
  if (result.length === 0) {
  return res.status(400).json({
    message: "Invalid Email ID"
  });
}

    const user = result[0];

  
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
  return res.status(400).json({
    message: "Invalid Password"
  });
}

    
if (user.role === "admin") {
  const token = jwt.sign(
    { user_id: user.user_id, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
   return res.status(200).json({
    message: "Admin login successful",
    token,
    user: {
      id: user.user_id,
      name: user.name,
      role: user.role
    }
  });
}

 
return res.status(200).json({
  message: "User login successful",
  user: {
    id: user.user_id,
    name: user.name,
    role: user.role
  }
});
});
};