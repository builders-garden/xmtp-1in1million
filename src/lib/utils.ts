import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function appUrl() {
  return process.env.NEXT_PUBLIC_HOST
    ? `https://${process.env.NEXT_PUBLIC_HOST}`
    : "http://localhost:3000";
}
