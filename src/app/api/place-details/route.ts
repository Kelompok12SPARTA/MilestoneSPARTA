import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const placeId = searchParams.get('placeId');
  const apiKey = process.env.GOOGLE_API_KEY; // Use environment variable for API key

  if (!placeId) {
    return NextResponse.json({ error: 'Invalid placeId' }, { status: 400 });
  }

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
      params: {
        place_id: placeId,
        key: apiKey,
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    let errorMessage = 'Error fetching place details';
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error(errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
