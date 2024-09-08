"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GameMerged } from "@/lib/zod/types";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const renderMoveIcon = (move: string) => {
  switch (move.toString()) {
    case "0":
      return <Image src="/images/rock.png" alt="Rock" width={20} height={20} />;
    case "1":
      return (
        <Image src="/images/paper.png" alt="Paper" width={20} height={20} />
      );
    case "2":
      return (
        <Image
          src="/images/scissors.png"
          alt="Scissors"
          width={20}
          height={20}
        />
      );
    default:
      return null;
  }
};

export const columns: ColumnDef<GameMerged>[] = [
  {
    accessorKey: "state",
    header: "Game Result",
    cell: ({ row }) => {
      const game = row.original;
      switch (game.state.toString()) {
        case "1":
          return "Player Won";
        case "2":
          return "Player Lost";
        default:
          return "In Progress";
      }
    },
  },
  {
    accessorKey: "currentStep",
    header: ({ column }) => (
      <Button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="rounded-xl text-white"
      >
        Win Streak
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => row.original.currentStep - 2,
  },
  {
    accessorKey: "Steps",
    header: "Steps",
    cell: ({ row }) => {
      const game = row.original;
      return (
        <Accordion type="single" collapsible className="">
          <AccordionItem value="steps">
            <AccordionTrigger className="w-[150px]">
              View Steps
            </AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal list-inside pl-4 text-black w-[150px]">
                {game.steps.map((step, index) => (
                  <li
                    key={index}
                    className="py-1 flex gap-1 items-center text-white w-fit"
                  >
                    <span className="flex font-bold">{index + 1}.</span>
                    <span className="font-bold">
                      {step.result ? (
                        <Check size={28} color="#00ff00" fontSize={6} />
                      ) : (
                        <X size={28} color="#ff0000" fontSize={6} />
                      )}
                    </span>
                    Player: {renderMoveIcon(step.playerMove)}
                    Contract: {renderMoveIcon(step.contractMove)}
                  </li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    },
  },
];
