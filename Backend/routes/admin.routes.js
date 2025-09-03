const { Router } = require("express");
const adminRouter = Router();

adminRouter.post("/signup", function () {});
adminRouter.post("/signin", function () {});
adminRouter.post("/course", function () {});
adminRouter.put("/course", function () {});
adminRouter.get("/course/bulk", function () {});

module.exports = {
  adminRouter: adminRouter,
};
