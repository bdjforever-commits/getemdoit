"use client";

import { motion } from "framer-motion";
import { CalendarDays, ChartLine, Palette } from "lucide-react";
import { DailyQuote } from "@/components/home/DailyQuote";
import { BottomNav } from "@/components/home/BottomNav";
import { ParticleField } from "@/components/home/ParticleField";
import { WeatherStrip } from "@/components/home/WeatherStrip";

const quickGlanceItems = [
  { label: "Plan", icon: CalendarDays, emoji: "📅" },
  { label: "Markets", icon: ChartLine, emoji: "📈" },
  { label: "Create", icon: Palette, emoji: "🎨" },
];

export function HomeExperience() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-36 pt-20 text-ens-platinum">
      <ParticleField />
      <WeatherStrip />

      <section className="relative z-10 flex w-full max-w-4xl flex-col items-center">
        <motion.div
          initial={{ opacity: 0.65, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative flex flex-col items-center"
        >
          <motion.div
            animate={{
              scale: [0.97, 1.03, 0.97],
              boxShadow: [
                "0 0 30px rgba(229, 228, 226, 0.12), 0 0 80px rgba(229, 228, 226, 0.04)",
                "0 0 40px rgba(229, 228, 226, 0.2), 0 0 120px rgba(127, 0, 255, 0.12)",
                "0 0 30px rgba(229, 228, 226, 0.12), 0 0 80px rgba(229, 228, 226, 0.04)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="h-[150px] w-[150px] rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.7),rgba(229,228,226,0.2)_38%,rgba(127,0,255,0.08)_72%,rgba(127,0,255,0)_100%)]"
          />

          <h1 className="mt-8 text-center text-2xl font-extralight uppercase tracking-display text-ens-platinum sm:text-3xl">
            ENSCIGHT
          </h1>
          <p className="absolute -bottom-6 right-[-2.3rem] text-[0.58rem] font-light italic tracking-[0.2em] text-ens-platinum/30 sm:right-[-3.4rem] sm:text-[0.62rem]">
            A Bobbie Daii Juor Synthesis
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.1, ease: "easeOut" }}
          className="mt-20 w-full max-w-xl"
        >
          <label htmlFor="whats-up" className="sr-only">
            What&apos;s up
          </label>
          <input
            id="whats-up"
            type="text"
            placeholder="What's up."
            className="w-full border-0 border-b border-ens-platinum/45 bg-transparent px-2 pb-3 pt-1 text-center text-lg font-light text-ens-platinum placeholder:text-ens-platinum/50 focus:border-ens-ultraviolet focus:shadow-[0_8px_28px_-12px_rgba(127,0,255,0.88)]"
          />
        </motion.div>

        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { delayChildren: 1.05, staggerChildren: 0.18 } },
          }}
          className="mt-10 flex items-center gap-3 sm:gap-5"
        >
          {quickGlanceItems.map(({ label, icon: Icon, emoji }) => (
            <motion.li
              key={label}
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >
              <button
                type="button"
                className="group flex min-w-[96px] items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.01] px-4 py-2 text-xs uppercase tracking-[0.22em] text-ens-platinum/78 transition duration-300 hover:border-ens-ultraviolet/75 hover:text-ens-ultraviolet"
              >
                <span aria-hidden className="text-[0.9rem]">
                  {emoji}
                </span>
                <Icon size={14} strokeWidth={1.8} />
                <span>{label}</span>
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      <DailyQuote />
      <BottomNav />

      <footer className="pointer-events-none fixed inset-x-0 bottom-4 z-10 text-center text-[0.6rem] font-light italic tracking-[0.22em] text-ens-platinum/28 sm:text-xs">
        A Bobbie Daii Juor Synthesis
      </footer>
    </main>
  );
}
