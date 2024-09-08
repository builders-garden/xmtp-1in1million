import { Client } from "@upstash/qstash";
import { appUrl } from "./utils";

const qstashClient = new Client({
  // Add your token to a .env file
  token: process.env.QSTASH_TOKEN!,
});

export async function createNewGameResultTask(id: string) {
  console.log("AAAAAA - app url", `${appUrl()}/api/game-result-worker`);
  const result = await qstashClient.publishJSON({
    url: `${appUrl()}/api/game-result-worker`,
    body: {
      id,
    },
  });
  console.log("Task created:", result);
}
