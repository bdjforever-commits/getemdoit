"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionShellProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  className?: string;
};

export function SectionShell({
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: SectionShellProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.72, ease: "easeOut" }}
      className={cn(
        "mx-auto mb-8 w-full max-w-6xl rounded-2xl border border-white/10 p-6 md:p-10",
        "glass-surface gradient-stroke",
        className,
      )}
    >
      <div className="space-y-3">
        <p className="display-type text-xs text-accent">{eyebrow}</p>
        <h2 className="max-w-3xl text-2xl font-thin tracking-[0.1em] text-text md:text-3xl">
          {title}
        </h2>
        <p className="max-w-3xl text-sm text-text/70 md:text-base">{subtitle}</p>
      </div>
      <div className="mt-7">{children}</div>
    </motion.section>
  );
}
