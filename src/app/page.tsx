import { fetchMetadata } from "frames.js/next";
import { Metadata } from "next";

import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Sponsors from "@/components/sponsors";
import Dashboard from "@/components/dashboard";
import Footer from "@/components/footer";

import { appUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Milionario - 1 in 1 Million",
    other: {
      ...(await fetchMetadata(new URL("/frames", appUrl()))),
    },
  };
}

export default async function Home() {
  return (
    <div className="flex-col flex gap-4 bg-black">
      <Navbar />
      <Hero />
      <Sponsors />
      <Dashboard />
      <Footer />
    </div>
  );
}
