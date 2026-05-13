const { Router } = require("express");
const { authorize } = require("../middlewares/authMiddleware");
const { generateAiInterviewReport } = require("../controllers/interviewControllers");
const upload = require("../middlewares/fileMiddleware");

const interviewRouter = Router();

interviewRouter.post("/ai/report", upload.single("resume"), generateAiInterviewReport)

module.exports = interviewRouter;
