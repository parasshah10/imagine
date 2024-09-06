import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;


export async function POST(request: Request) {
  const body = await request.json();
  const { prompt, width, height, model, number_results } = body;

  try {
    console.log(`${process.env.NEXT_PUBLIC_API_URL}/generate-image`)
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



export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 5;
  const offset = (page - 1) * limit;

  const pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    const client = await pool.connect();
    const result = await client.query(`
      SELECT b.id, b.prompt, b.width, b.height, b.model, array_agg(i.url) as image_urls, b.created_at
      FROM batches b
      JOIN images i ON i.batch_id = b.id
      GROUP BY b.id, b.prompt, b.width, b.height, b.model, b.created_at
      ORDER BY b.created_at DESC
      LIMIT $1 OFFSET $2
    `, [limit, offset]);

    const countResult = await client.query('SELECT COUNT(*) FROM batches');
    const totalCount = parseInt(countResult.rows[0].count, 10);

    client.release();

    const batches = result.rows.map(row => ({
      id: row.id,
      prompt: row.prompt,
      width: row.width,
      height: row.height,
      model: row.model,
      images: row.image_urls.map((url: string) => ({ url })),
      createdAt: row.created_at ? row.created_at.toISOString() : null
    }));

    const hasMore = totalCount > page * limit;

    return NextResponse.json({ batches, hasMore });
  } catch (error) {
    console.error('Error fetching batches:', error);
    return NextResponse.json({ error: 'Failed to fetch batches' }, { status: 500 });
  } finally {
    await pool.end();
  }
}


export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Batch ID is required' }, { status: 400 });
  }

  try {
    const pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false
      }
    });
    const client = await pool.connect();
    
    // Delete associated images first
    await client.query('DELETE FROM images WHERE batch_id = $1', [id]);
    
    // Then delete the batch
    await client.query('DELETE FROM batches WHERE id = $1', [id]);
    
    client.release();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting batch:', error);
    return NextResponse.json({ error: 'Failed to delete batch' }, { status: 500 });
  }
}
