const express = require("express");
const router = express.Router();
const User = require("../User.js");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "ITSMYFIRSTPROJECTINMERNSTACK";
router.post(
  "/createuser",
  body("name").isLength({ min: 3 }),
  body("email").isEmail(),
  body("location").isLength({ min: 5 }),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const encodepassword = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: encodepassword,
        location: req.body.location,
      }).then(res.json({ success: true }));
    } catch (error) {
      console.log("yuuppp", error);
      res.json({ success: false });
    }
  }
);
router.post(
  "/loginuser",[
  body("email").isEmail(),
  body("password","Incorrect Password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Invalid email" });
      }
      const decodepassword = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!decodepassword) {
        return res.status(400).json({ errors: "Enter valid credentials" });
      }
      const data = {
        user: {
          id: userData.id,
        },
      };
      const authtoken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authtoken: authtoken });
    } catch (error) {
      console.log("yuuppp", error);
      res.json({ success: false });
    }
  }]);

module.exports = router;
