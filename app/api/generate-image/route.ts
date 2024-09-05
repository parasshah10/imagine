import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { prompt, width, height, model, number_results } = body;

  console.log('Received request:', body);  // Debug: Log the received request

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, width, height, model, number_results }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', response.status, errorText);  // Debug: Log the error response
      throw new Error(`Failed to generate image: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('Received data:', data);  // Debug: Log the received data
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
