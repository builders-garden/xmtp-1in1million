import { fetchMetadata } from "frames.js/next";
import { Metadata } from "next";

import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Dashboard from "@/components/dashboard";
import { appUrl } from "@/lib/utils";
import Footer from "@/components/footer";

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
    <div className="flex-col flex gap-16 bg-black">
      <Navbar />
      <Hero />
      <Dashboard />
      <Footer />
    </div>
  );
}
