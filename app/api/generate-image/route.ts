import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { prompt, width, height, model, number_results } = body;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, width, height, model, number_results }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate image');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-batches`);
    if (!response.ok) {
      throw new Error('Failed to fetch batches');
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching batches:', error);
    return NextResponse.json({ error: 'Failed to fetch batches' }, { status: 500 });
  }
}
