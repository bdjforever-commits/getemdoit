"use client";

import { FormEvent, useMemo, useState } from "react";
import { LogIn, Mail, Sparkles, UserPlus } from "lucide-react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

type StatusState = {
  type: "idle" | "success" | "error";
  message: string;
};

export function AuthCard() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusState>({
    type: "idle",
    message: "Enter your private email for ENSCIGHT access.",
  });

  const supabase = useMemo(() => createBrowserSupabaseClient(), []);
  const authEnabled = Boolean(supabase);

  const handleMagicLink = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!authEnabled || !supabase) {
      setStatus({
        type: "error",
        message: "Supabase env keys are missing. Add them to enable auth.",
      });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/auth/callback`
            : undefined,
      },
    });
    setLoading(false);

    if (error) {
      setStatus({ type: "error", message: error.message });
      return;
    }

    setStatus({
      type: "success",
      message: "Magic link sent. Welcome to the mirror layer.",
    });
  };

  return (
    <article className="glass-surface gradient-stroke rounded-2xl space-y-5 p-6">
      <header className="space-y-2">
        <p className="display-type text-[11px] text-accent">Private Access</p>
        <h3 className="text-2xl text-platinum">Obsidian Portal</h3>
        <p className="text-sm text-platinum/70">
          Human-first onboarding with invisible friction and visible warmth.
        </p>
      </header>

      <form onSubmit={handleMagicLink} className="space-y-3">
        <label className="flex items-center gap-2 rounded-md border border-platinum/10 bg-surface/70 px-3 py-2">
          <Mail className="h-4 w-4 text-accent" />
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full bg-transparent text-sm text-platinum outline-none placeholder:text-platinum/35"
            placeholder="you@enscight.com"
          />
        </label>

        <div className="grid gap-2 sm:grid-cols-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-3 py-2 text-sm font-medium text-platinum transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogIn className="h-4 w-4" />
            {loading ? "Sending..." : "Send Magic Link"}
          </button>
          <button
            type="button"
            disabled
            className="inline-flex items-center justify-center gap-2 rounded-md border border-platinum/20 bg-transparent px-3 py-2 text-sm text-platinum/70"
          >
            <UserPlus className="h-4 w-4" />
            Invite-only
          </button>
        </div>
      </form>

      <footer
        className={`rounded-md border px-3 py-2 text-sm ${
          status.type === "error"
            ? "border-red-500/40 text-red-300"
            : status.type === "success"
            ? "border-gold/40 text-gold"
            : "border-platinum/10 text-platinum/60"
        }`}
      >
        <span className="inline-flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          {authEnabled ? status.message : "Connect Supabase keys to activate auth."}
        </span>
      </footer>
    </article>
  );
}
