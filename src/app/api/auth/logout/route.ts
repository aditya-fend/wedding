import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logout sukses' });
  
  // Hapus custom cookie
  response.cookies.delete('user_session');

  return response;
}
