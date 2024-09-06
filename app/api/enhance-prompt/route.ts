import { NextResponse } from 'next/server';
import OpenAI from "openai";

export async function POST(request: Request) {
  const body = await request.json();
  const { prompt } = body;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
  });
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are an AI assistant that enhances image generation prompts. Your task is to take a user's prompt and make it more detailed and descriptive, suitable for high-quality image generation.",
      },
      {
        role: "user",
        content: `Enhance this image generation prompt: ${prompt}. Reply with the enhanced prompt only.`,
      }
    ],
    model: "gemini-1.5-flash-latest",
  });

  const enhancedPrompt = completion.choices[0].message.content;

  return NextResponse.json({ enhancedPrompt });
}

