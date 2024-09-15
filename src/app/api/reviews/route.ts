import { db } from '@/db';
import { reviewsTable } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { restaurantId, content } = await request.json();

  if (!restaurantId || !content) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Insert the new review
  await db.insert(reviewsTable).values({
    restaurantId: restaurantId, // using `restaurantId` from the schema
    content: content,
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
