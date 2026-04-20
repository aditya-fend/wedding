// src/app/api/geocode/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) return NextResponse.json({ error: 'Missing coords' }, { status: 400 });

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&accept-language=id`,
      {
        headers: {
          'User-Agent': 'WeddingInvitationApp/1.0 (contact@yourdomain.com)', // Bebas diatur di server
        },
      }
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch geocode' }, { status: 500 });
  }
}