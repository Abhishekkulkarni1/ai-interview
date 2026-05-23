const { Router } = require("express");
const { authorize } = require("../middlewares/authMiddleware");
const { generateAiInterviewReport, getInterviewReportById, getAllInterviewReports, downloadResumePdf } = require("../controllers/interviewControllers");
const upload = require("../middlewares/fileMiddleware");

const interviewRouter = Router();

interviewRouter.post("/ai/report", authorize, upload.single("resume"), generateAiInterviewReport);
interviewRouter.get("/ai/report/:interviewId", authorize , getInterviewReportById);
interviewRouter.get("/ai/allReports", authorize, getAllInterviewReports)
interviewRouter.post("/ai/resume/pdf/:interviewReportId", authorize, downloadResumePdf)

module.exports = interviewRouter;
