import { languages } from "@/data/languages"
import { Language } from "@/typescript/interfaces";
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLanguage(iso_639_1: string): Language | string {
  const language = languages.find((language) => language.iso_639_1 === iso_639_1);
  return language ? { ...language } : iso_639_1;
}