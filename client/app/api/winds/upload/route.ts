import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

export const runtime = "nodejs";

function slugify(str: string) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(req: NextRequest) {
  try {
    // 1) Check session
    const sessionId = req.cookies.get("wt_session")?.value;
    if (!sessionId) {
      return NextResponse.json(
        { message: "You must be logged in to upload." },
        { status: 401 }
      );
    }

    const sessionRes = await db.query(
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

    if (sessionRes.rowCount === 0) {
      return NextResponse.json(
        { message: "Invalid or expired session." },
        { status: 401 }
      );
    }

    const user = sessionRes.rows[0];

    // 2) Parse form data
    const formData = await req.formData();

    const title = (formData.get("title") as string | null)?.trim();
    const artist = (formData.get("artist") as string | null)?.trim();
    const bpmRaw = formData.get("bpm") as string | null;
    const lenRaw = formData.get("length_seconds") as string | null;
    const audio = formData.get("audio") as File | null;

    if (!title || !artist || !audio) {
      return NextResponse.json(
        { message: "Title, artist, and audio file are required." },
        { status: 400 }
      );
    }

    if (audio.type !== "audio/mpeg") {
      return NextResponse.json(
        { message: "Only MP3 files are supported for now." },
        { status: 400 }
      );
    }

    const bpm = bpmRaw ? parseInt(bpmRaw, 10) : null;
    const lengthSeconds = lenRaw ? parseInt(lenRaw, 10) : null;

    // 3) Save MP3 to public/uploads/audio
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "audio");
    await mkdir(uploadsDir, { recursive: true });

    const ext = ".mp3";
    const randomName = crypto.randomUUID() + ext;
    const filePath = path.join(uploadsDir, randomName);
    const publicUrl = `/uploads/audio/${randomName}`;

    const arrayBuffer = await audio.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(filePath, buffer);

    // 4) Insert into songs
    const songResult = await db.query(
      `
      INSERT INTO songs
        (title, artist, bpm, length_seconds, audio_url, cover_url, is_official, uploader_id)
      VALUES
        ($1, $2, $3, $4, $5, NULL, FALSE, $6)
      RETURNING id, title, artist, bpm, length_seconds;
      `,
      [title, artist, bpm, lengthSeconds, publicUrl, user.id]
    );

    const song = songResult.rows[0];

    // 5) Insert into winds so it shows in Discover
    const slugBase = slugify(title);
    const slug = `${slugBase}-${crypto.randomBytes(3).toString("hex")}`; // e.g. midnight-etude-a3f9c2

    const windResult = await db.query(
      `
      INSERT INTO winds
        (song_id, slug, title, difficulty, difficulty_label, creator_id, status, description, chart_file_url)
      VALUES
        ($1, $2, $3, NULL, NULL, $4, 'published', NULL, $5)
      RETURNING id, slug, title, status;
      `,
      [
        song.id,
        slug,
        title,
        user.id,
        "/charts/placeholder.json", // required NOT NULL for now
      ]
    );

    const wind = windResult.rows[0];

    return NextResponse.json(
      {
        message: "Upload successful.",
        song,
        wind,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
