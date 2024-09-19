"use client";

import * as React from "react";
import type { SVGProps } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlayerMerged } from "@/lib/zod/types";
import Image from "next/image";

export const columns: ColumnDef<PlayerMerged>[] = [
  {
    accessorKey: "farcasterUser",
    header: "Player",
    filterFn: (row, columnId, filterValue) => {
      const foundDisplayname =
        row.original.farcasterUser?.displayName
          .toLowerCase()
          .includes(filterValue.toLowerCase()) ?? false;
      const foundUsername =
        row.original.farcasterUser?.username
          .toLowerCase()
          .includes(filterValue.toLowerCase()) ?? false;
      const foundAddress =
        row.original.address
          .toLowerCase()
          .includes(filterValue.toLowerCase()) ?? false;
      return foundDisplayname || foundUsername || foundAddress;
    },
    cell: ({ row }) => {
      const player = row.original;
      return (
        <div className="flex items-center gap-2 px-2">
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
                  <span className="text-indigo-400 text-sm font-semibold">
                    {player.farcasterUser.username?.length > 14
                      ? `@${player.farcasterUser.username?.slice(0, 10)}...`
                      : `@${player.farcasterUser.username}`}
                  </span>
                ) : (
                  <span className="text-indigo-400 text-sm font-semibold">
                    {`${player.address.slice(0, 6)}...${player.address.slice(-4)}`}
                  </span>
                )}
              </div>
            </>
          ) : (
            <span className="text-indigo-400 hover:underline text-sm font-semibold">
              {`${player.address.slice(0, 6)}...${player.address.slice(-4)}`}
            </span>
          )}
          <div className="flex flex-col sm:flex-row items-center gap-2">
            {player.address && (
              <Link
                href={`https://sepolia.etherscan.io/address/${player.address}`}
                target="_blank"
              >
                <EthereumIcon className="size-4" />
              </Link>
            )}
            {player.farcasterUser && player.farcasterUser.fid !== -1 && (
              <Link
                href={`https://warpcast.com/${player.farcasterUser?.username}`}
                target="_blank"
              >
                <FarcasterIcon className="size-4" />
              </Link>
            )}
          </div>
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
    cell: ({ row }) => (
      <div className="px-4">{row.original.stats.bestRound - 1}</div>
    ),
  },
  {
    accessorKey: "stats.gamesWon",
    header: "Games Won",
    cell: ({ row }) => (
      <div className="px-4">{row.original.stats.gamesWon.toString()}</div>
    ),
  },
  {
    accessorKey: "stats.gamesLost",
    header: "Games Lost",
    cell: ({ row }) => (
      <div className="px-4">{row.original.stats.gamesLost.toString()}</div>
    ),
  },
  {
    accessorKey: "stats.totalSpent",
    header: "Total Spent (ETH)",
    cell: ({ row }) => (
      <div className="px-4">
        {(Number(row.original.stats.totalSpent) / 1e18).toFixed(4)}
      </div>
    ),
  },
  {
    accessorKey: "stats.totalWon",
    header: "Total Won (ETH)",
    cell: ({ row }) => (
      <div className="px-4">
        {(Number(row.original.stats.totalWon) / 1e18).toFixed(4)}
      </div>
    ),
  },
];

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

const EthereumIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    version="1.1"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    imageRendering="optimizeQuality"
    fillRule="evenodd"
    clipRule="evenodd"
    viewBox="0 0 784.37 1277.39"
    {...props}
  >
    <g id="Layer_x0020_1">
      <metadata id="CorelCorpID_0Corel-Layer" />
      <g id="_1421394342400">
        <g>
          <polygon
            fill="#343434"
            fillRule="nonzero"
            points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "
          />
          <polygon
            fill="#8C8C8C"
            fillRule="nonzero"
            points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "
          />
          <polygon
            fill="#3C3C3B"
            fillRule="nonzero"
            points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "
          />
          <polygon
            fill="#8C8C8C"
            fillRule="nonzero"
            points="392.07,1277.38 392.07,956.52 -0,724.89 "
          />
          <polygon
            fill="#141414"
            fillRule="nonzero"
            points="392.07,882.29 784.13,650.54 392.07,472.33 "
          />
          <polygon
            fill="#393939"
            fillRule="nonzero"
            points="0,650.54 392.07,882.29 392.07,472.33 "
          />
        </g>
      </g>
    </g>
  </svg>
);

const FarcasterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1000"
    height="1000"
    viewBox="0 0 1000 1000"
    {...props}
  >
    <path
      d="M257.778 155.556H742.222V844.445H671.111V528.889H670.414C662.554 441.677 589.258 373.333 500 373.333C410.742 373.333 337.446 441.677 329.586 528.889H328.889V844.445H257.778V155.556Z"
      fill="#855DCD"
    />
    <path
      d="M128.889 253.333L157.778 351.111H182.222V746.667C169.949 746.667 160 756.616 160 768.889V795.556H155.556C143.283 795.556 133.333 805.505 133.333 817.778V844.445H382.222V817.778C382.222 805.505 372.273 795.556 360 795.556H355.556V768.889C355.556 756.616 345.606 746.667 333.333 746.667H306.667V253.333H128.889Z"
      fill="#855DCD"
    />
    <path
      d="M675.556 746.667C663.283 746.667 653.333 756.616 653.333 768.889V795.556H648.889C636.616 795.556 626.667 805.505 626.667 817.778V844.445H875.556V817.778C875.556 805.505 865.606 795.556 853.333 795.556H848.889V768.889C848.889 756.616 838.94 746.667 826.667 746.667V351.111H851.111L880 253.333H702.222V746.667H675.556Z"
      fill="#855DCD"
    />
  </svg>
);
