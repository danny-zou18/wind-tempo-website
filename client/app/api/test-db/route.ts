import { db } from "@/lib/db";

export async function GET() {
  try {
    const result = await db.query("SELECT COUNT(*) FROM winds");
    return new Response(
      JSON.stringify({ winds_count: result.rows[0].count }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response("DB Error", { status: 500 });
  }
}
