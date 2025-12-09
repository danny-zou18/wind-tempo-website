import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, username, password } = await req.json();

    if (!email || !username || !password) {
      return NextResponse.json(
        { message: "Email, username, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const existing = await db.query(
      `
      SELECT email, username
      FROM users
      WHERE email = $1 OR username = $2
      LIMIT 1;
      `,
      [email, username]
    );

    if (existing.rowCount > 0) {
      const row = existing.rows[0];
      if (row.email === email) {
        return NextResponse.json(
          { message: "Email is already in use." },
          { status: 409 }
        );
      }
      if (row.username === username) {
        return NextResponse.json(
          { message: "Username is already taken." },
          { status: 409 }
        );
      }
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await db.query(
      `
      INSERT INTO users (username, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, username, email, created_at;
      `,
      [username, email, passwordHash]
    );

    const user = result.rows[0];

    return NextResponse.json(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
