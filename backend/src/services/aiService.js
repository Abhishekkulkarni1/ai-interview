const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
// const { zodToJsonSchema } = require("zod-to-json-schema");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

const interviewReportSchema = z.object({
  title: z
    .string()
    .describe(
      "The exact job title inferred from the provided job description. Keep it concise and industry-standard.",
    ),

  matchScore: z
    .number()
    .describe(
      "A realistic compatibility score between 0 and 100 representing how strongly the candidate's resume, experience, projects, and skills align with the job description. The score should reflect actual interview competitiveness, not optimism. Consider technical skills, years of experience, domain relevance, project quality, tools/frameworks used, and missing requirements.",
    ),

  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "A realistic technical interview question that is highly likely to be asked for this specific role based on the job description, required technologies, candidate background, and experience level.",
          ),

        intention: z
          .string()
          .describe(
            "Explain what the interviewer is truly evaluating through this question. Mention the underlying concepts, problem-solving ability, technical depth, real-world experience, debugging skills, architecture knowledge, scalability thinking, or communication skills being tested.",
          ),

        answer: z
          .string()
          .describe(
            "A detailed but concise strategy for answering the question effectively. Include key concepts to mention, practical examples the candidate can use, ideal answer structure, important technical points to cover, common mistakes to avoid, and how an experienced interviewer would expect a strong candidate to respond.",
          ),
      }),
    )
    .describe(
      "A list of highly relevant and role-specific technical interview questions tailored to the candidate's resume, projects, technologies, and the job description. Questions should resemble real interview questions asked in actual hiring rounds rather than textbook theory questions.",
    ),

  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "A realistic behavioral or situational interview question likely to be asked for this role and candidate profile.",
          ),

        intention: z
          .string()
          .describe(
            "Explain what personality traits, communication abilities, leadership qualities, ownership mindset, teamwork skills, adaptability, conflict resolution ability, or professional maturity the interviewer is evaluating through this question.",
          ),

        answer: z
          .string()
          .describe(
            "Provide guidance on how the candidate should answer effectively using structured storytelling approaches such as STAR (Situation, Task, Action, Result). Mention the kind of examples, achievements, and communication style that would create a strong impression.",
          ),
      }),
    )
    .describe(
      "Behavioral and HR-style interview questions personalized to the candidate's background, career trajectory, projects, teamwork exposure, leadership experience, and likely recruiter concerns.",
    ),

  skillGaps: z
    .array(
      z.object({
        skill: z
          .string()
          .describe(
            "A missing or weak skill, technology, experience area, or competency that reduces the candidate's alignment with the target role.",
          ),

        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "Represents how critical this missing skill is for succeeding in the role. High severity means the skill is either mandatory or heavily emphasized in the job description.",
          ),
      }),
    )
    .describe(
      "A realistic assessment of missing skills, weak areas, insufficient experience, or gaps between the candidate profile and job requirements.",
    ),

  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("Sequential preparation day number starting from 1."),

        focus: z
          .string()
          .describe(
            "The primary preparation theme for the day such as JavaScript fundamentals, Node.js internals, system design, React performance optimization, DSA, behavioral preparation, debugging practice, or mock interviews.",
          ),

        tasks: z
          .array(z.string())
          .describe(
            "Actionable preparation tasks for the day. Tasks should be specific, measurable, practical, and directly relevant to improving interview readiness for this role.",
          ),
      }),
    )
    .describe(
      "A structured, practical, and realistic interview preparation roadmap customized to the candidate's skill gaps, target role, and experience level. The plan should prioritize high-impact preparation areas first.",
    ),

  analysis: z.string(),

  strengths: z.array(z.string()),

  weaknesses: z.array(z.string()),
});

const generateInterviewReport = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {
  const prompt = `
You are an expert technical interviewer and recruiter.

Analyze the candidate based on:
1. Resume
2. Self description
3. Job description

Generate a realistic interview preparation report.

IMPORTANT RULES:
- Return ONLY valid JSON
- No markdown
- No explanations
- No extra text
- Follow the exact structure below
- All arrays must contain objects, not flat strings
- Use camelCase keys only
- Return ONLY raw JSON.
- Do not wrap in markdown.
- Do not add explanations.
- Do not add text before or after JSON.

Expected JSON structure:

{
  "title": string,
  "matchScore": number,
  "analysis": string,
  "strengths": string[],
  "weaknesses": string[],

  "technicalQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],

  "behavioralQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],

  "skillGaps": [
    {
      "skill": string,
      "severity": "low" | "medium" | "high"
    }
  ],

  "preparationPlan": [
    {
      "day": number,
      "focus": string,
      "tasks": string[]
    }
  ]
}

Requirements:
- matchScore must be between 0 and 100
- technicalQuestions should be practical and role-specific
- behavioralQuestions should evaluate communication, ownership, teamwork, and problem-solving
- skillGaps should identify realistic missing skills
- preparationPlan should be actionable and day-wise
- strengths and weaknesses should be concise bullet-style points

CANDIDATE RESUME:
${resume}

SELF DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      // responseSchema: zodToJsonSchema(interviewReportSchema),
    },
  });

  // return JSON.parse(response.text);
  const parsedResponse = JSON.parse(response.text);

  console.log(
    JSON.stringify(parsedResponse, null, 2),
    "RAW AI RESPONSE"
  );

  const validationResult =
    interviewReportSchema.safeParse(parsedResponse);

  if (!validationResult.success) {
    console.log(validationResult.error.format());

    throw new Error("Invalid AI response format");
  }

  return validationResult.data;
};

module.exports = { generateInterviewReport };
