const express = require("express");
const app = express();
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const { courseRouter } = require("./routes/course");
require("dotenv").config();

const PORT = process.env.PORT;

app.use(express.json());
console.log(
  "HEllo");
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);

app.listen(PORT, function () {
  console.log(`Server is live on Port ${PORT}`);
});
