const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const interviewRouter = require("./routes/interviewRoute");
const cors = require("cors");

const app = express();

app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-interview-frontend-yo3l.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;
