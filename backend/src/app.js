const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const interviewRouter = require("./routes/interviewRoute");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-interview-frontend-yo3l.onrender.com"
    ],
    credentials: true,
  }),
);
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;
