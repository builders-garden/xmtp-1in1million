import { NextResponse } from "next/server";
import { getAllGames } from "@/lib/transaction";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const games = await getAllGames();
    return NextResponse.json({
      games: JSON.stringify(games, (_, v) =>
        typeof v === "bigint" ? v.toString() : v
      ),
    });
  } catch (error) {
    console.error("Error fetching games:", error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
}
