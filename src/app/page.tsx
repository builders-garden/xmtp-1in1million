import { fetchMetadata } from "frames.js/next";
import { Metadata } from "next";

import Navbar from "@/components/navbar";
import Dashboard from "@/components/dashboard";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Milionario - 1 in 1 Million",
    other: {
      ...(await fetchMetadata(
        new URL(
          "/frames",
          process.env.NEXT_PUBLIC_HOST
            ? `https://${process.env.NEXT_PUBLIC_HOST}`
            : "http://localhost:3000"
        )
      )),
    },
  };
}

export default async function Home() {
  return (
    <div className="">
      <Navbar />
      <Dashboard />
    </div>
  );
}
