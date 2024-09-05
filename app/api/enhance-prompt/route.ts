import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { prompt } = body;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enhance-prompt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('Failed to enhance prompt');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error enhancing prompt:', error);
    return NextResponse.json({ error: 'Failed to enhance prompt' }, { status: 500 });
  }
}
