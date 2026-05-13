require("dotenv").config();
const pdfParse = require("pdf-parse");
const interviewReportModel = require("../models/InterviewReportModel");
const { generateInterviewReport } = require("../services/aiService");

const generateAiInterviewReport = async (req, res) => {
  try {
    const resumeContent = await new pdfParse.PDFParse(
      Uint8Array.from(req.file.buffer),
    ).getText();
    const { selfDescription, jobDescription } = req.body;

    const interviewAiReport = await generateInterviewReport({
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
    });
    console.log(JSON.stringify(interviewAiReport,  null, 2), "gvsdhjasdhjasbdhjasbd")
    const interviewReport = await interviewReportModel.create({
        user: "69fef2d81182b98cb57a44f8",
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewAiReport
    })

    return res.status(201).json({
        message: "Interview report generated successfully",
        interviewReport
    })

  } catch (error) {
    console.log(error, "Error while generating interview report");
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  generateAiInterviewReport,
};
