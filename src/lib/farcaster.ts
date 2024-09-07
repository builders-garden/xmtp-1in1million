import { NeynarAPIClient } from "@neynar/nodejs-sdk";

// make sure to set your NEYNAR_API_KEY .env
const apiKey = process.env.NEYNAR_API_KEY;
if (!apiKey) {
  throw new Error("NEYNAR_API_KEY is not set");
}

const client = new NeynarAPIClient(apiKey);

const getFarcasterUserAddressesByFid = async (
  fid: number
): Promise<`0x${string}`[]> => {
  const user = await client.fetchBulkUsers([fid]);
  const addresses: `0x${string}`[] = [];

  if (user.users[0]?.custody_address) {
    addresses.push(user.users[0]?.custody_address as `0x${string}`);
  }

  user.users[0]?.verified_addresses.eth_addresses.forEach((address) => {
    addresses.push(address as `0x${string}`);
  });

  return addresses;
};

const getFarcasterUserByAddress = async (address: `0x${string}`) => {
  const users = await client.fetchBulkUsersByEthereumAddress([address]);
  return users;
};

export { getFarcasterUserAddressesByFid, getFarcasterUserByAddress };
