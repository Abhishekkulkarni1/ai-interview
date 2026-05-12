const mongoose = require("mongoose");

const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is a required field"],
    },
    intention: {
      type: String,
      required: [true, "Intention is a required field"],
    },
    answer: {
      type: String,
      required: [true, "Answer is a required field"],
    },
  },
  {
    _id: false,
  },
);

const behaviouralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is a required field"],
    },
    intention: {
      type: String,
      required: [true, "Intention is a required field"],
    },
    answer: {
      type: String,
      required: [true, "Answer is a required field"],
    },
  },
  {
    _id: false,
  },
);

const skillGapSchema = new mongoose.Schema({
  skill: {
    type: String,
    required: [true, "Skill is a required field"],
  },
  severity: {
    type: String,
    enum: ["low", "medium", "high"],
    required: [true, "Severity is required field"],
  },
});

const preparationPlanSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: [true, "Day is a required field"],
  },
  focus: {
    type: String,
    required: [true, "Focus is a required field"],
  },
  tasks: [
    {
      type: String,
      required: [true, "Task is a required field"],
    },
  ],
});

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: Number,
      required: [true, "Job description is a required field"],
    },
    resume: {
      type: String,
    },
    selfDescription: {
      type: String,
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    technicalQuestions: [technicalQuestionSchema],
    behaviouralQuestions: [behaviouralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Title is a required field"],
    },
  },
  {
    timestamps: true,
  },
);

const InterviewReportModel = mongoose.model("InterviewReportModel", interviewReportSchema);

module.exports = InterviewReportModel
