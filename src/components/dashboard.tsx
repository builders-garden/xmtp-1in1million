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

function Dashboard() {
  const { user, loggedIn, login } = useWeb3AuthContext();

  const games = [
    {
      game: "GAME 1",
      status: "Won",
      winInRow: 6,
      playedOn: "2024-09-01 19:37",
    },
  ];

  return (
    <div className="container">
      <div className="flex flex-col items-start justify-center p-4 bg-slate-100">
        {loggedIn ? (
          <>
            <h2 className="text-2xl font-bold">Your games</h2>
            <Table>
              <TableCaption>A list of your recent games.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Game</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Win in a row</TableHead>
                  <TableHead className="text-right">Played on</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {games.map((game) => (
                  <TableRow key={game.game}>
                    <TableCell className="font-medium">{game.game}</TableCell>
                    <TableCell>{game.status}</TableCell>
                    <TableCell className="text-right">
                      {game.winInRow}
                    </TableCell>
                    <TableCell className="text-right">
                      {game.playedOn}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
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
