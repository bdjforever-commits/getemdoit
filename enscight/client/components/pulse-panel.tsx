"use client";

import { useMemo } from "react";
import { LockKeyhole, Sparkles } from "lucide-react";

import { hasSupabaseEnv } from "@/lib/env";

type PulsePanelProps = {
  pulseCount: number;
};

export function PulsePanel({ pulseCount }: PulsePanelProps) {
  const title = useMemo(() => {
    if (!hasSupabaseEnv) {
      return "Data Layer Awaiting Connection";
    }
    return "Live Pulse Connected";
  }, []);

  return (
    <article className="glass-surface relative overflow-hidden rounded-3xl p-6 shadow-ultraviolet">
      <div className="pointer-events-none absolute -top-14 right-0 h-32 w-32 rounded-full bg-ultraviolet/20 blur-3xl" />

      <header className="mb-6 flex items-center justify-between">
        <div>
          <p className="display-type text-xs text-text/65">Pulse</p>
          <h3 className="mt-2 text-xl font-light tracking-[0.14em] text-text">
            {title}
          </h3>
        </div>
        {hasSupabaseEnv ? (
          <Sparkles className="h-5 w-5 text-gold" />
        ) : (
          <LockKeyhole className="h-5 w-5 text-ultraviolet" />
        )}
      </header>

      <div className="space-y-4 text-sm text-text/80">
        <p>
          The ENSCIGHT pulse feed is prepared for private reflections, collection movement, and
          expressive metadata.
        </p>
        <div className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3">
          <p className="display-type text-xs text-text/55">Entries</p>
          <p className="mt-2 text-3xl font-light tracking-[0.12em] text-gold">{pulseCount}</p>
        </div>
        {!hasSupabaseEnv ? (
          <p className="text-xs text-text/65">
            Set Supabase environment variables to activate live data.
          </p>
        ) : null}
      </div>
    </article>
  );
}
