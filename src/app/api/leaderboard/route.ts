import { NextResponse } from "next/server";
import { getLeaderboard } from "@/lib/transaction";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const leaderboard = await getLeaderboard();

    return NextResponse.json({
      leaderboard: JSON.stringify(leaderboard, (_, v) =>
        typeof v === "bigint" ? v.toString() : v
      ),
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
