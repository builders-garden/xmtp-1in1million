import { NextResponse } from "next/server";
import { getFarcasterUserAddresses } from "@/lib/farcaster";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fid = searchParams.get("fid");

  if (!fid) {
    return NextResponse.json({ error: "FID is required" }, { status: 400 });
  }

  try {
    const addresses = await getFarcasterUserAddresses(parseInt(fid));
    return NextResponse.json({ addresses });
  } catch (error) {
    console.error("Error fetching Farcaster user addresses:", error);
    return NextResponse.json(
      { error: "Failed to fetch Farcaster user addresses" },
      { status: 500 }
    );
  }
}
