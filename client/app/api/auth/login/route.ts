import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    const result = await db.query(
      `
      SELECT id, email, username, password_hash
      FROM users
      WHERE email = $1
      LIMIT 1;
      `,
      [email]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // create session row
    const session = await db.query(
      `
      INSERT INTO auth_sessions (user_id, expires_at, user_agent, ip_address)
      VALUES ($1, now() + interval '30 days', $2, $3)
      RETURNING id;
      `,
      [
        user.id,
        req.headers.get("user-agent") ?? null,
        // NextRequest doesn't give you real IP easily in dev; null is fine
        null,
      ]
    );

    const sessionId: string = session.rows[0].id;

    const res = NextResponse.json({
      id: user.id,
      email: user.email,
      username: user.username,
    });

    // attach cookie
    res.cookies.set({
      name: "wt_session",
      value: sessionId,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
