const { Router } = require("express");
const { authorize } = require("../middlewares/authMiddleware");
const { generateAiInterviewReport, getInterviewReportById, getAllInterviewReports, downloadResumePdf } = require("../controllers/interviewControllers");
const upload = require("../middlewares/fileMiddleware");

const interviewRouter = Router();

interviewRouter.post("/ai/report", upload.single("resume"), generateAiInterviewReport);
interviewRouter.get("/ai/report/:interviewId", getInterviewReportById);
interviewRouter.get("/ai/allReports", getAllInterviewReports)
interviewRouter.post("/ai/resume/pdf/:interviewReportId", downloadResumePdf)

module.exports = interviewRouter;
