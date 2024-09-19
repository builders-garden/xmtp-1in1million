import { Client } from "@upstash/qstash";
import { appUrl } from "./utils";

const qstashClient = new Client({
  // Add your token to a .env file
  token: process.env.QSTASH_TOKEN!,
});

export async function createNewGameResultTask(id: string) {
  console.log(
    "create new game result task - app url",
    `${appUrl()}/api/game-result-worker`,
    id
  );
  const result = await qstashClient.publishJSON({
    url: `${appUrl()}/api/game-result-worker`,
    body: {
      id,
    },
  });
  console.log(`create new game result task - task ${id} created:`, result);
}
