import createAuthRequired from "@/app/lib/createAuthRequired";
import { baseURL } from "@/baseUrl"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"
import { ContentWidget, widgetMeta } from "./types";

export async function registerSaveQuizTool(server: McpServer, html: string){

  const quizSaverWidget: ContentWidget = {
    id: "quiz-saver",
    title: "Quiz Saver",
    templateUri: "ui://widget/quiz-saver-template.html",
    invoking: "quiz saving",
    invoked: "Quiz saved",
    html: html,
    description: "Save the Quiz to the backend database",
    widgetDomain: "https://sider.ai",
  };

  // 注册 widget 资源
  server.registerResource(
    "quiz-saver-widget",
    quizSaverWidget.templateUri,
    {
      title: quizSaverWidget.title,
      description: quizSaverWidget.description,
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": quizSaverWidget.description,
        "openai/widgetPrefersBorder": true,
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${quizSaverWidget.html}</html>`,
          _meta: {
            "openai/widgetDescription": quizSaverWidget.description,
            "openai/widgetPrefersBorder": true,
            "openai/widgetDomain": quizSaverWidget.widgetDomain,
          },
        },
      ],
    })
  );

    server.registerTool(
        'quiz-saver',
        {
          title: 'Quiz Saver',
          description: 'Save the Quiz to the backend database',
          inputSchema: {
            title: z.string().describe("Quiz title (e.g., 'Python Programming Quiz')"),
            description: z.string().describe("Brief description of the quiz"),
            questions: z.array(
              z.object({
                id: z.string().describe("Unique question ID (e.g., 'q1', 'q2')"),
                question: z.string().describe("The question text. For mathematical formulas, use KaTeX syntax: $...$ for inline formulas, $$...$$ for display formulas"),
                hint: z.string().describe("Helpful hint for this question. For mathematical formulas, use KaTeX syntax: $...$ for inline formulas, $$...$$ for display formulas"),
                options: z.array(
                  z.object({
                    text: z.string().describe("Option text. For mathematical formulas, use KaTeX syntax: inline formulas with $...$ (e.g., '$x^2 + y^2 = z^2$') and display formulas with $$...$$ (e.g., '$$\\frac{a}{b}$$')"),
                    isCorrect: z.boolean().describe("Whether this option is the correct answer"),
                    explanation: z.string().describe("Explanation for this option (why it's correct or why it's wrong). For mathematical formulas, use KaTeX syntax: $...$ for inline formulas, $$...$$ for display formulas"),
                  })
                ).length(4).describe("Array of answer options (typically 4). Each question must have exactly 4 options, and only ONE option should have isCorrect: true"),
              })
            ).describe("Array of quiz questions")
          },
          outputSchema: {
            type: z.string().describe('widget types')
          },
          _meta: widgetMeta(quizSaverWidget),
          // securitySchemes: [
          //   { type: "oauth2" as const, scopes: ["read.stuff"] },
          // ],
        } as any,
        async (input, extra) => {
            console.log("....xxxx", input);
            const { id, method, payload, queryParams, headers }= input;
            const token = extra?.authInfo?.token
            console.log(input, 'input')
            if(!token){
              const a = createAuthRequired()
              console.log(a, 'res')
              return a
            }

            return {
              content: [
                {
                  type: 'text',
                  text: 'save success',
                },
              ],
              structuredContent: {
                type: 'quiz-saver'
              },
            }
        },
      )
}