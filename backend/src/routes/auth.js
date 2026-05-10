const { Router } = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  userDetails,
} = require("../controllers/authControllers");
const { authorize } = require("../middlewares/authMiddleware");
const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/logout", logoutUser);
authRouter.get("/userDetails", authorize, userDetails);

module.exports = authRouter;
