const { Router } = require("express");
const { purchaseModel } = require("../models/purchase.model");
const authMiddleware = require("../middleware/auth.middleware");
const courseModel = require("../models/course.model");

const courseRouter = Router();

courseRouter.post("/purchase", authMiddleware, async function (req, res) {
  const userId = req.user.id;
  const courseId = req.body.courseId;

  await purchaseModel.create({
    userId,
    courseId,
  });

  res.json({
    message: "You have successfully bought the course",
  });
});
courseRouter.get("/preview", async function (req, res) {
  const courses = await courseModel.find({});
  res.json({
    courses,
  });
});

module.exports = {
  courseRouter: courseRouter,
};
