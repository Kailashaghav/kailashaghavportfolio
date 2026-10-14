// app/api/admin/login/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

const sha = (s: string) => crypto.createHash("sha256").update(s).digest();

export async function POST(req: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { success: false, error: "ADMIN_PASSWORD is not set on the server." },
      { status: 500 }
    );
  }

  let password = "";
  try {
    const body = await req.json();
    password = String(body?.password || "");
  } catch {
    /* empty body */
  }

  const ok = crypto.timingSafeEqual(sha(password), sha(expected));
  if (!ok) {
    return NextResponse.json(
      { success: false, error: "Wrong password." },
      { status: 401 }
    );
  }
  return NextResponse.json({ success: true });
}
