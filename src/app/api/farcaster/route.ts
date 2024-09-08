import { NextResponse } from "next/server";
import { getFarcasterUserAddressesByFid } from "@/lib/farcaster";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fid = searchParams.get("fid");

  if (!fid) {
    return NextResponse.json({ error: "FID is required" }, { status: 400 });
  }

  try {
    const addresses = await getFarcasterUserAddressesByFid(parseInt(fid));
    return NextResponse.json({
      addresses: JSON.stringify(addresses, (_, v) =>
        typeof v === "bigint" ? v.toString() : v
      ),
    });
  } catch (error) {
    console.error("Error fetching Farcaster user addresses:", error);
    return NextResponse.json(
      { error: "Failed to fetch Farcaster user addresses" },
      { status: 500 }
    );
  }
}
