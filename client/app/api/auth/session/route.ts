import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.cookies.get("wt_session")?.value;

    if (!sessionId) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const result = await db.query(
      `
      SELECT u.id, u.username, u.email
      FROM auth_sessions s
      JOIN users u ON u.id = s.user_id
      WHERE s.id = $1
        AND s.expires_at > now()
      LIMIT 1;
      `,
      [sessionId]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json(
      { user: result.rows[0] },
      { status: 200 }
    );
  } catch (err) {
    console.error("Session error:", err);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
