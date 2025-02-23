import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateTaskDescription = async (title) => {
  const response = await openai.completions.create({
    model: "gpt-4",
    prompt: `Generate a professional task description for: ${title}`,
    max_tokens: 50,
  });
  return response.choices[0].text.trim();
};
