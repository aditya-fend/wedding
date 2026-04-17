import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { userId } = await req.json();

  if (!userId) {
    return Response.json({ error: "No userId" }, { status: 400 });
  }

  const cookieStore = await cookies(); // ✅ WAJIB await di sini

  cookieStore.set("user_session", userId, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return Response.json({ success: true });
}