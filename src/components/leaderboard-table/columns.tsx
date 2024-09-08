"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlayerMerged } from "@/lib/zod/types";
import Image from "next/image";

const DefaultUserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-6"
  >
    <path
      fillRule="evenodd"
      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      clipRule="evenodd"
    />
  </svg>
);

export const columns: ColumnDef<PlayerMerged>[] = [
  {
    accessorKey: "farcasterUser",
    header: "Player",
    cell: ({ row }) => {
      const player = row.original;
      return (
        <div className="flex items-center space-x-2">
          {player.farcasterUser ? (
            <>
              {player.farcasterUser.fid === -1 ? (
                <DefaultUserIcon />
              ) : (
                <Image
                  src={player.farcasterUser.pfp}
                  alt={player.farcasterUser.displayName}
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              )}
              <div>
                <div className="font-medium">
                  {player.farcasterUser.displayName}
                </div>
                {player.farcasterUser.fid !== -1 ? (
                  <Link
                    href={`https://warpcast.com/${player.farcasterUser.username}`}
                    target="_blank"
                    className="text-indigo-400 text-sm hover:underline font-semibold"
                  >
                    {player.farcasterUser.username?.length > 14
                      ? `@${player.farcasterUser.username?.slice(0, 10)}...`
                      : `@${player.farcasterUser.username}`}
                  </Link>
                ) : (
                  <Link
                    href={`https://sepolia.etherscan.io/address/${row.original.address}`}
                    target="_blank"
                    className="text-indigo-400 hover:underline text-sm font-semibold"
                  >
                    {`${row.original.address.slice(0, 6)}...${row.original.address.slice(-4)}`}
                  </Link>
                )}
              </div>
            </>
          ) : (
            <div className="font-medium">
              {`${player.address.slice(0, 6)}...${player.address.slice(-4)}`}
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "stats.bestRound",
    header: ({ column }) => (
      <Button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="rounded-xl text-white"
      >
        Best Win Streak
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => row.original.stats.bestRound - 1,
  },
  {
    accessorKey: "stats.gamesWon",
    header: "Games Won",
    cell: ({ row }) => row.original.stats.gamesWon.toString(),
  },
  {
    accessorKey: "stats.gamesLost",
    header: "Games Lost",
    cell: ({ row }) => row.original.stats.gamesLost.toString(),
  },
  {
    accessorKey: "stats.totalSpent",
    header: "Total Spent (ETH)",
    cell: ({ row }) =>
      (Number(row.original.stats.totalSpent) / 1e18).toFixed(4),
  },
  {
    accessorKey: "stats.totalWon",
    header: "Total Won (ETH)",
    cell: ({ row }) => (Number(row.original.stats.totalWon) / 1e18).toFixed(4),
  },
];
