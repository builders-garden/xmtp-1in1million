import { NextRequest, NextResponse } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/dist/nextjs";
import { Logger } from "@/lib/logger";
import { storeGameResultObject } from "@/lib/kv";
import { log } from "console";
import {
  // getTransactionReceipt,
  getWaitTransactionReceipt,
  readLogs,
} from "@/lib/transaction";

const logger = new Logger("api/game-result-worker");

type milionarioTransactionArgs = {
  contractMove?: number;
  stepResult?: boolean;
  playerReward?: bigint; // how much the player won
  gameId?: bigint;
};

async function handler(req: NextRequest) {
  const body = await req.json();
  const { id } = body;
  logger.log(`Processing GameResultTask: ${id}`);

  try {
    let storeResultInKv = await storeGameResultObject(id, "loading");

    // here I need to fetch the step result from the contract
    let transactionReceipt = await getWaitTransactionReceipt(id);

    // CASE: (!transactionReceipt) => the transaction is pending
    // const maxTries = 10;
    // let tries = 0;
    // while (!transactionReceipt && tries < maxTries) {
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    //   logger.log(
    //     `trying to fetch transaction receipt for ${id} - attempt #${tries}`
    //   );
    //   transactionReceipt = await getTransactionReceipt(id);
    // }

    if (!transactionReceipt) {
      logger.error(`Transaction ${id} not found`);
      await storeGameResultObject(id, "error", "Transaction not found");
      return NextResponse.json({ message: "Transaction not found!" });
    }

    let transactionArgs: milionarioTransactionArgs | undefined;
    if (transactionReceipt.status === "success") {
      const transactionLogs = await readLogs(transactionReceipt);
      transactionArgs = transactionLogs.map(
        (log) => log.args
      )[0] as milionarioTransactionArgs;
    }

    await storeGameResultObject(
      id,
      "success",
      undefined,
      transactionArgs?.contractMove,
      transactionArgs?.stepResult,
      transactionArgs?.playerReward?.toString(),
      transactionArgs?.gameId?.toString()
    );
    return NextResponse.json({ message: "Game Result stored!" });
  } catch (error) {
    logger.error(`Error processing GameResultTask: ${id}`);
    console.error("Error processing GameResultTask", id, error);
    return NextResponse.json({ message: "Error processing Game Result!" });
  }
}

export const POST = verifySignatureAppRouter(handler);
