import { NextRequest, NextResponse } from "next/server";
import { Logger } from "@/lib/logger";
import { createNewGameResultTask } from "@/lib/qstash";

const logger = new Logger("api/game-result-task");

export const POST = async (req: NextRequest) => {
  const secret = req.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({
      success: false,
      error: "Invalid secret",
    });
  }
  const body = await req.json();
  const { id } = body;
  if (!id) {
    console.error("Missing id");
    return NextResponse.json(
      {
        success: false,
        error: "Missing id",
      },
      {
        status: 400,
        statusText: "Bad Request",
      }
    );
  }
  logger.log(`creating new task...: ${id}`);

  try {
    await createNewGameResultTask(id);
  } catch (error) {
    console.error("Error creating new GameResultTask", id, error);
    return NextResponse.json({
      success: false,
      error: "Error creating new GameResultTask",
    });
  }

  return NextResponse.json({
    success: true,
  });
};
