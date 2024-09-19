"use client";

import React, { useMemo } from "react";

import { useWeb3AuthContext } from "@/hooks/web3auth-context";
import { useQuery } from "@tanstack/react-query";
import { GameMerged, PlayerMerged } from "@/lib/zod/types";
import {
  LeaderboardTable,
  columns as leaderboardColumns,
} from "@/components/leaderboard-table";
import { GamesTable, columns as gamesColumns } from "@/components/games-table";

const fetchUserAddresses = async (fid: number): Promise<`0x${string}`[]> => {
  try {
    const addresses = await fetch("/api/farcaster?fid=" + fid)
      .then((res) => res.json())
      .then((data) => JSON.parse(data.addresses));

    return addresses as `0x${string}`[];
  } catch (error) {
    console.error("Error fetching user addresses from fid:", fid, error);
    return [];
  }
};

const fetchAllGames = async (): Promise<GameMerged[]> => {
  try {
    const games = await fetch("/api/games", {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => JSON.parse(data.games));

    return games as GameMerged[];
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
};

const fetchLeaderboard = async (): Promise<PlayerMerged[]> => {
  try {
    const data = await fetch("/api/leaderboard", {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => JSON.parse(data.leaderboard));
    return data as PlayerMerged[];
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
};

function Dashboard() {
  const { user, loggedIn, login } = useWeb3AuthContext();
  const userFid = parseInt(user?.verifierId || "1");

  const {
    data: games,
    isLoading: gamesLoading,
    isFetched: gamesFetched,
  } = useQuery({
    queryKey: ["getAllGames"],
    queryFn: fetchAllGames,
  });
  const {
    data: leaderboard,
    isLoading: leaderboardLoading,
    isFetched: leaderboardFetched,
  } = useQuery({
    queryKey: ["getLeaderboard", userFid],
    queryFn: fetchLeaderboard,
  });

  const {
    data: farcasterUserAddresses,
    isLoading: farcasterUserAddressesLoading,
    isFetched: farcasterUserAddressesFetched,
  } = useQuery({
    queryKey: ["getFarcasterUser", userFid],
    queryFn: () => fetchUserAddresses(userFid),
    enabled: !!userFid,
  });
  // const farcasterUserAddresses = [
  //   "0xAf22B0CE4B439769579A892457B9fC391bF1BC96" as `0x${string}`,
  // ];
  // const farcasterUserAddressesFetched = true;

  const transformedUserGames = useMemo(() => {
    if (
      gamesFetched &&
      farcasterUserAddressesFetched &&
      Array.isArray(games) &&
      farcasterUserAddresses
    ) {
      return games
        .filter((game) =>
          farcasterUserAddresses.includes(
            game.player.toLowerCase() as `0x${string}`
          )
        )
        .map((game) => ({
          ...game,
          address: game.player,
          farcasterUser: null, // You might want to fetch this separately
          stats: {
            gamesWon: 0n, // Replace with actual data if available
            gamesLost: 0n,
            bestRound: game.currentStep,
            totalSpent: 0n,
            totalWon: 0n,
          },
          gamesPlayed: [Number(game.id)],
        })) as GameMerged[];
    }
    return [] as GameMerged[];
  }, [
    userFid,
    gamesFetched,
    farcasterUserAddressesFetched,
    games,
    farcasterUserAddresses,
  ]);

  return (
    <div className="sm:container flex flex-col gap-16 items-start justify-center p-5 sm:p-10 pb-24">
      <div className="w-full">
        <h2 className="text-4xl mb-4 font-bagel">Leaderboard</h2>
        {leaderboardLoading ? (
          <p>Loading leaderboard...</p>
        ) : leaderboard && leaderboard.length > 0 ? (
          <LeaderboardTable
            columns={leaderboardColumns}
            data={leaderboard}
            defaultPageSize={10}
          />
        ) : (
          <p>The leaderboard is empty.</p>
        )}
      </div>
      {loggedIn ? (
        <div className="w-full">
          <h2 className="text-4xl mb-4 font-bagel">Your games</h2>
          {gamesLoading ? (
            <p>Loading your games...</p>
          ) : transformedUserGames && transformedUserGames.length > 0 ? (
            <GamesTable
              columns={gamesColumns}
              data={transformedUserGames}
              defaultPageSize={10}
            />
          ) : (
            <p>You don't have any games yet.</p>
          )}
        </div>
      ) : (
        // align left
        <div className="flex flex-col gap-6 items-start">
          <h2 className="text-3xl font-bagel">To see your games, login.</h2>
          <button
            onClick={login}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition duration-200 rounded-xl text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
