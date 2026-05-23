require("dotenv").config();
const pdfParse = require("pdf-parse");
const interviewReportModel = require("../models/InterviewReportModel");
const { generateInterviewReport, generateResumePdf } = require("../services/aiService");

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

    const interviewReport = await interviewReportModel.create({
      user: "69fef2d81182b98cb57a44f8",
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
      ...interviewAiReport,
    });

    return res.status(201).json({
      message: "Interview report generated successfully",
      interviewReport,
    });
  } catch (error) {
    console.log(error, "Error while generating interview report");
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getInterviewReportById = async (req, res) => {
  try {
    const { interviewId } = req.params;

    const interviewReport = await interviewReportModel.findOne({
      _id: interviewId,
      user: "69fef2d81182b98cb57a44f8",
    });

    if (!interviewReport) {
      return res.status(404).json({
        message: "Interview report not found.",
      });
    }

    return res.status(200).json({
      message: "Interview report fetched successfully.",
      interviewReport,
    });
  } catch (error) {
    console.log(error, "Error while generating interview report");
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllInterviewReports = async (req, res) => {
  try {
    const interviewReports = await interviewReportModel
      .find({ user: "69fef2d81182b98cb57a44f8" })
      .sort({ createdAt: -1 })
      .select(
        "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
      );

    return res.status(200).json({
      message: "Interview reports fetched successfully.",
      interviewReports,
    });
  } catch (error) {
    console.log(error, "Error while generating interview report");
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const downloadResumePdf = async (req, res) => {
  try {
    const { interviewReportId } = req.params;
    console.log(interviewReportId);
    const interviewReport = await interviewReportModel.findById(
      interviewReportId,
    );

    if (!interviewReport) {
      return res.status(404).json({
        message: "Interview report not found.",
      });
    }

    const { resume, jobDescription, selfDescription } = interviewReport;

    const pdfBuffer = await generateResumePdf({
      resume,
      jobDescription,
      selfDescription,
    });
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
    });

    res.send(pdfBuffer);
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
  getInterviewReportById,
  getAllInterviewReports,
  downloadResumePdf,
};
