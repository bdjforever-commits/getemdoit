import { Sparkles, ShieldCheck, Gem, Orbit } from "lucide-react";
import { AuthCard } from "@/components/auth-card";
import { HeroCanvas } from "@/components/hero-canvas";
import { InsightComposer } from "@/components/insight-composer";
import { PulsePanel } from "@/components/pulse-panel";
import { SectionShell } from "@/components/section-shell";
import { hasOpenRouterKey } from "@/lib/env";

const pillars = [
  {
    title: "Incohesive Cohesiveness",
    copy: "Unexpected edges, intuitive flow, and emotional clarity woven into one seamless experience.",
    icon: Sparkles,
  },
  {
    title: "Human Warmth",
    copy: "Presence without pressure. ENSCIGHT responds with discretion, nuance, and composure.",
    icon: ShieldCheck,
  },
  {
    title: "Luxury Systems",
    copy: "A premium full-stack core powered by Supabase, OpenRouter intelligence, and motion-first design.",
    icon: Gem,
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-obsidian text-platinum">
      <section className="hero-gradient relative min-h-[85vh] px-6 pb-20 pt-16 md:px-10">
        <HeroCanvas />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12">
          <div className="space-y-6">
            <p className="display-type text-xs text-gold">ENSCIGHT / PHASE 1</p>
            <h1 className="max-w-3xl text-4xl font-thin leading-tight tracking-[0.08em] text-platinum md:text-6xl">
              UNEXPECTED HARMONY FOR ELEVATED DIGITAL INTELLIGENCE
            </h1>
            <p className="max-w-2xl text-sm text-platinum/80 md:text-base">
              Designed by Bobbie Daii Juor, ENSCIGHT blends quiet opulence with intuitive interaction.
              Every motion, contrast, and decision is tuned for warm precision.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {pillars.map(({ title, copy, icon: Icon }) => (
              <div
                key={title}
                className="glass-surface rounded-xl border border-white/10 p-5"
              >
                <Icon className="mb-3 h-5 w-5 text-accent" />
                <h2 className="display-type mb-2 text-xs text-platinum">{title}</h2>
                <p className="text-sm text-platinum/70">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionShell
        eyebrow="Authentication"
        title="Private entry, graceful control."
        subtitle="Supabase auth is integrated for sign-up and sign-in. Session state appears in real time."
      >
        <AuthCard />
      </SectionShell>

      <SectionShell
        eyebrow="AI Core"
        title="OpenRouter insight, delivered softly."
        subtitle="Submit a creative intent and receive model output through a dedicated Next.js API route."
      >
        <InsightComposer enabled={hasOpenRouterKey} />
      </SectionShell>

      <SectionShell
        eyebrow="Data Pulse"
        title="Database-backed ambient intelligence."
        subtitle="Supabase connectivity check and sample data pull for ENSCIGHT telemetry."
      >
        <PulsePanel pulseCount={0} />
      </SectionShell>

      <footer className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pb-10 pt-4 text-xs text-platinum/50 md:px-10">
        <span className="display-type">ENSCIGHT</span>
        <span className="inline-flex items-center gap-2">
          <Orbit className="h-4 w-4 text-gold" />
          Crafted by Bobbie Daii Juor
        </span>
      </footer>
    </main>
  );
}
