const express = require("express");
const app = express();
const { userRouter } = require("./routes/user.routes");
const { adminRouter } = require("./routes/admin.routes");
const { courseRouter } = require("./routes/course.routes");
const connectDb = require("./config/db.config");
app.use(express.json());
connectDb();

const PORT = process.env.PORT;


app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);

app.listen(PORT, function () {
  console.log(`Server is live on Port ${PORT}`);
});
