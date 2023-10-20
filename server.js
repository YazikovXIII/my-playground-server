require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { PORT, MONGO_DB_URL } = process.env;
const userRouter = require("./router/user_route");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/user", userRouter);
app.use((err, req, res, next) => {
  const { status = 500, message = "server error" } = err;
  res.status(status).json({ message: message });
});

const start = async () => {
  try {
    await mongoose.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
