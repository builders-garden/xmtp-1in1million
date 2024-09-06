"use client";

import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useWeb3AuthContext } from "@/hooks/web3auth-context";
import { getAllGames, getLeaderboard } from "@/lib/transaction";
import { useQuery } from "@tanstack/react-query";
import { formatEther } from "viem";

const fetchUserAddresses = async (fid: number) => {
  const addresses = await fetch("/api/farcaster?fid=" + fid);
  const data = await addresses.json();
  return data.addresses;
};

function Dashboard() {
  const { data: games } = useQuery({
    queryKey: ["getAllGames"],
    queryFn: getAllGames,
  });
  const { data: leaderboard } = useQuery({
    queryKey: ["getLeaderboard"],
    queryFn: getLeaderboard,
  });

  const { user, loggedIn, login } = useWeb3AuthContext();
  const userFid = parseInt(user?.verifierId || "1");

  const { data: farcasterUserAddresses } = useQuery({
    queryKey: ["getFarcasterUser", userFid],
    queryFn: () => fetchUserAddresses(userFid),
    enabled: !!userFid,
  });
  const userGames = games?.filter((game) =>
    farcasterUserAddresses?.addresses?.includes(game.player)
  );

  return (
    <div className="container">
      <div className="flex flex-col gap-12 items-start justify-center p-4 bg-slate-100">
        <div className="w-full">
          <h2 className="text-2xl font-bold">Leaderboard</h2>
          <Table>
            <TableCaption>A list of the best users.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">User</TableHead>
                <TableHead>Wins in a row</TableHead>
                <TableHead>Best round</TableHead>
                <TableHead className="">Total spent</TableHead>
                <TableHead className="">Total won</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard?.map((player) => (
                <TableRow key={player.address}>
                  <TableCell className="font-semibold">
                    {player.address}
                  </TableCell>
                  <TableCell>{player.stats.gamesWon.toString()}</TableCell>
                  <TableCell>{player.stats.bestRound}</TableCell>
                  <TableCell>
                    {`${formatEther(player.stats.totalSpent)} ETH`}
                  </TableCell>
                  <TableCell>
                    {`${formatEther(player.stats.totalWon)} ETH`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {loggedIn ? (
          <div className="w-full">
            <h2 className="text-2xl font-bold">Your games</h2>
            <Table>
              <TableCaption>
                {userGames && userGames.length > 0
                  ? "A list of your recent games."
                  : "You don't have any games yet."}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Player</TableHead>
                  <TableHead className="">State</TableHead>
                  <TableHead className="">Current step</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userGames?.map((game) => (
                  <TableRow key={game.id}>
                    <TableCell className="font-semibold">
                      {game.player}
                    </TableCell>
                    <TableCell>{game.state}</TableCell>
                    <TableCell>{game.currentStep}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold">To see your games, login</h2>
            <button
              onClick={login}
              className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 text-white"
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
