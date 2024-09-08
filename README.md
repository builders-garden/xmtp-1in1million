# Milionario - 1 in 1 Million Game

## Project Aim

Milionario is a decentralized version of the "1 in 1 Million" game where players aim to win 13 consecutive rounds of Rock, Paper, Scissors to claim the grand prize. This project combines blockchain technology with a classic game, offering players a chance to win Ethereum rewards while enjoying a familiar gameplay experience.

Key Features:

- Decentralized gameplay using smart contracts on the Base Sepolia testnet;
- Integration with Farcaster Frames for interactive gameplay;
- XMTP chat bot integration, allowing users to play the game directly through chat;
- Chainlink oracle integration for generating truly random smart contract moves
- Web3Auth implementation in the frontend for seamless login with Farcaster or web3 wallets;
- Real-time leaderboard and game statistics;
- Prize pool that grows with each play;
- Tiered reward system for reaching milestones (6, 9, and 13 wins);

You can find the demo video [here](https://youtu.be/GNFNrhv3T9k).

## Setup

1. Clone the repository:

   ```
   git clone https://github.com/builders-garden/xmtp-1in1million.git
   cd xmtp-1in1million
   ```

2. Install dependencies:

   ```
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:

   ```
   NEYNAR_API_KEY="<your_neynar_apikey>" # used to retrieve Farcaster data from the website
   SECRET="<your_secret>" # used to authenticate the request to the QStash call

   # All QStash variables
   QSTASH_URL="<qstash_url>"
   QSTASH_TOKEN="<your_qstash_token>"
   QSTASH_CURRENT_SIGNING_KEY="<your_qstash_current_signing_key>"
   QSTASH_NEXT_SIGNING_KEY="<your_qstash_next_signing_key>"

   # KV variables
   KV_URL="<kv_url>"
   KV_REST_API_URL="<kv_rest_api_url>"
   KV_REST_API_TOKEN="<kv_rest_api_token>"
   KV_REST_API_READ_ONLY_TOKEN="<kv_rest_api_read_only_token>"
   ```

4. Run the development server:

   ```
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `/src/app`: Next.js app router pages and API routes
- `src/app/frame`: Farcaster Frame
- `/src/components`: React components
- `/src/hooks`: Custom React hooks
- `/src/lib`: Utility functions and configurations
- `/public`: Static assets

## XMTP Bot

The XMTP bot was developed on another repository, you can find it [here](https://github.com/builders-garden/xmtp-milly-bot).
