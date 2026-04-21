"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { ParticleField } from "@/components/home/ParticleField";

type AuthShellProps = {
  children: React.ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-20">
      <ParticleField />
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute left-5 top-6 z-20 sm:left-10 sm:top-8"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-ens-platinum/70 transition hover:text-ens-ultraviolet"
        >
          <ArrowLeft size={14} />
          Home
        </Link>
      </motion.div>

      <div className="relative z-10 w-full">{children}</div>

      <footer className="pointer-events-none fixed inset-x-0 bottom-6 text-center text-[0.62rem] italic tracking-[0.2em] text-ens-platinum/35">
        A Bobbie Daii Juor Synthesis
      </footer>
    </main>
  );
}
