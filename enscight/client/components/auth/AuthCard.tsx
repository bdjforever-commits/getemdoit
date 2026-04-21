"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Crown, Gem, Sparkles } from "lucide-react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type AuthCardProps = {
  mode: "sign-in" | "sign-up";
};

const tiers = [
  { name: "Free", description: "Calm essentials", icon: Sparkles },
  { name: "Gold", description: "Elevated focus", icon: Crown },
  { name: "Platinum", description: "Full resonance", icon: Gem },
];

export function AuthCard({ mode }: AuthCardProps) {
  const isSignUp = mode === "sign-up";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tier, setTier] = useState("Free");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const title = useMemo(() => (isSignUp ? "Join ENSCIGHT" : "Welcome Back"), [isSignUp]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!supabase) {
      setStatus("Connect Supabase keys to activate authentication.");
      return;
    }

    setIsSubmitting(true);
    setStatus("");

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              tier,
            },
          },
        });

        if (error) throw error;
        setStatus("Account initiated. Check your inbox to confirm.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setStatus("Signed in. Enter your sanctuary.");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to continue.";
      setStatus(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: "easeOut" }}
      className="w-full max-w-md rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.03)] px-7 py-8 backdrop-blur-xl sm:px-10"
    >
      <p className="font-technical text-[0.62rem] uppercase tracking-[0.3em] text-ens-platinum/45">
        Authentication Shell
      </p>
      <h1 className="mt-4 text-2xl font-extralight uppercase tracking-[0.35em] text-ens-platinum">
        {title}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-ens-platinum/70">
        Human warmth, precise access. Move at your own rhythm.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <label className="block space-y-2">
          <span className="font-technical text-[0.62rem] uppercase tracking-[0.24em] text-ens-platinum/55">
            Email
          </span>
          <input
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-white/15 bg-white/[0.02] px-4 py-3 text-sm text-ens-platinum placeholder:text-ens-platinum/45"
            placeholder="you@enscight.ai"
          />
        </label>

        <label className="block space-y-2">
          <span className="font-technical text-[0.62rem] uppercase tracking-[0.24em] text-ens-platinum/55">
            Password
          </span>
          <input
            required
            minLength={8}
            type="password"
            autoComplete={isSignUp ? "new-password" : "current-password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-white/15 bg-white/[0.02] px-4 py-3 text-sm text-ens-platinum placeholder:text-ens-platinum/45"
            placeholder="••••••••"
          />
        </label>

        {isSignUp ? (
          <div className="space-y-2">
            <p className="font-technical text-[0.62rem] uppercase tracking-[0.24em] text-ens-platinum/55">
              Membership
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              {tiers.map(({ name, description, icon: Icon }) => {
                const selected = tier === name;
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setTier(name)}
                    className={`rounded-xl border px-3 py-3 text-left transition ${
                      selected
                        ? "border-ens-ultraviolet bg-ens-ultraviolet/10"
                        : "border-white/15 bg-white/[0.01] hover:border-ens-ultraviolet/55"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon size={14} className={selected ? "text-ens-ultraviolet" : "text-ens-platinum/70"} />
                      <span className="text-xs uppercase tracking-[0.16em] text-ens-platinum">{name}</span>
                    </div>
                    <p className="mt-1 text-[0.68rem] text-ens-platinum/60">{description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-ens-ultraviolet/70 bg-ens-ultraviolet/12 px-4 py-3 text-sm uppercase tracking-[0.2em] text-ens-platinum transition hover:bg-ens-ultraviolet/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Please wait" : isSignUp ? "Create account" : "Sign in"}
          <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
        </button>
      </form>

      <p className="mt-4 min-h-5 text-xs text-ens-platinum/65">{status}</p>
      {!isSupabaseConfigured ? (
        <p className="text-xs text-ens-gold/85">
          Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to connect live auth.
        </p>
      ) : null}

      <div className="mt-7 text-xs text-ens-platinum/62">
        {isSignUp ? (
          <p>
            Already inside?{" "}
            <Link href="/auth/sign-in" className="text-ens-ultraviolet hover:underline">
              Sign in
            </Link>
          </p>
        ) : (
          <p>
            New here?{" "}
            <Link href="/auth/sign-up" className="text-ens-ultraviolet hover:underline">
              Create account
            </Link>
          </p>
        )}
      </div>
    </motion.section>
  );
}
