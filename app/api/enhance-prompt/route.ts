import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

export async function POST(request: Request) {
  const body = await request.json();
  const { prompt } = body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an AI assistant that enhances image generation prompts. Your task is to take a user's prompt and make it more detailed and descriptive, suitable for high-quality image generation." },
        { role: "user", content: `Enhance this image generation prompt: ${prompt}` }
      ],
      max_tokens: 150,
    });

    const enhancedPrompt = completion.choices[0].message.content;
    return NextResponse.json({ enhancedPrompt });
  } catch (error) {
    console.error('Error enhancing prompt:', error);
    return NextResponse.json({ error: 'Failed to enhance prompt' }, { status: 500 });
  }
}
