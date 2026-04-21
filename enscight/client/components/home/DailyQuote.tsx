"use client";

import { useMemo } from "react";

const quotes = [
  "Quiet confidence is still the loudest room.",
  "Discipline is devotion with a pulse.",
  "Elegance is what remains after noise exits.",
  "Choose depth, then move with softness.",
  "Clarity is a luxury you can practice daily.",
  "Precision without warmth is unfinished craft.",
  "Lead with intention, finish with grace.",
];

const dailyIndex = (date = new Date()) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay) % quotes.length;
};

export function DailyQuote() {
  const quote = useMemo(() => quotes[dailyIndex()], []);

  return (
    <p className="pointer-events-none fixed inset-x-0 bottom-28 z-20 text-center text-xs italic tracking-[0.14em] text-ens-platinum/40 sm:text-sm">
      {quote}
    </p>
  );
}
