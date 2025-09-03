const { Router } = require("express");
const userModel = require("../models/user.model");
const purchaseModel = require("../models/purchase.model");
const authMiddleware = require("../middleware/auth.middleware");
const bcrypt = require("bcrypt");

const userRouter = Router();
require("dotenv").config();

const jwt = require("jsonwebtoken");

userRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await userModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      role: role,
    });
  } catch (error) {
    res.json({
      message: "Something wrong",
    });
  }
  res.json({
    message: "User account created  Successfully",
  });
});

userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  let user;
  try {
    user = await userModel.findOne({
      email: email,
    });
  } catch (error) {
    res.json({
      message: "Something wrong with database request",
    });
  }

  if (!user) {
    res.status(403).json({
      message: "Wrong credentails",
    });
  } else {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Invalid Password",
      });
    const token = await jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET
    );

    res.json({
      token: token,
    });
  }
});
userRouter.get("/purchases", authMiddleware, async function (req, res) {
  const userId = req.user.id;
  const purchasedCourseIds = [];
  console.log(userId);
  try {

    const purchases = await purchaseModel.find({
      userId
    });
    console.log(purchases);

    for (let i = 0; i < purchases.length; i++) {
      purchasedCourseIds.push(purchases[i].courseId);
    }

    res.json({
      purchases,
    });
  } catch (error) {
    res.json({
      message: "Something wrong",
    });
  }
});

module.exports = {
  userRouter: userRouter,
};
