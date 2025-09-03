const { Router } = require("express");
const courseRouter = Router();

courseRouter.post("/purchase", function () {});
courseRouter.get("/preview", function () {});

module.exports = {
  courseRouter: courseRouter,
};
