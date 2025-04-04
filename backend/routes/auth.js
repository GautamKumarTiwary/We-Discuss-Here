const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Gautamisagoodboy";

// 🚀 Simple GET route to test API
router.get("/", (req, res) => {
  res.json({ message: "🚀 API is working!" });
});

// ✅ Create User Route - POST "/api/auth/createuser"
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    console.log("➡️ Received POST /createuser request");
    console.log("Request Body:", req.body);

    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // 🚀 Check if user already exists
      let existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "User with this email already exists!" });
      }

      // 🚀 Securely hash the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // 🚀 Create new user
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // Generate auth token
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      await user.save();

      // Return the auth token
      res.json({ authtoken });
    } catch (err) {
      console.error("❌ Error:", err);
      res
        .status(500)
        .json({ error: "Internal Server Error", message: err.message });
    }
  }
);

// ✅ Login Route - POST "/api/auth/login"
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // 🚀 Check if user exists
      let user = await User.findOne({ email });
      if (!user) {
        // ✅ Corrected condition check
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      // 🚀 Compare the password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      // Generate auth token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 3 : get login user data details " api/auth/getuser"
router.post("/getuser",  fetchuser, async (req, res) => {

    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
