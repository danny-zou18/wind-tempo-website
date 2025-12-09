import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const sessionId = req.cookies.get("wt_session")?.value;

    const res = NextResponse.json({ ok: true });

    if (sessionId) {
      await db.query("DELETE FROM auth_sessions WHERE id = $1", [sessionId]);

      res.cookies.set({
        name: "wt_session",
        value: "",
        path: "/",
        maxAge: 0,
      });
    }

    return res;
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
