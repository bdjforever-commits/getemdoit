"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

type InsightComposerProps = {
  enabled: boolean;
};

type ApiResponse = {
  output?: string;
  error?: string;
};

export function InsightComposer({ enabled }: InsightComposerProps) {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const isDisabled = useMemo(
    () => !enabled || status === "loading" || prompt.trim().length < 8,
    [enabled, status, prompt],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setResult("");

    try {
      const response = await fetch("/api/insight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = (await response.json()) as ApiResponse;
      if (!response.ok || data.error) {
        throw new Error(data.error ?? "Unable to generate insight right now.");
      }

      setResult(data.output ?? "No output was returned.");
      setStatus("idle");
    } catch (error) {
      setStatus("error");
      setResult(
        error instanceof Error
          ? error.message
          : "Something unexpected happened while contacting OpenRouter.",
      );
    }
  };

  return (
    <div className="glass-surface gradient-stroke rounded-2xl p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="display-type text-[11px] text-accent">
            AI Atelier
          </p>
          <h3 className="mt-2 text-xl text-platinum">OpenRouter Insight Composer</h3>
        </div>
        <Sparkles className="h-5 w-5 text-gold" />
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm text-platinum/70" htmlFor="insight-prompt">
          Prompt the system with mood, strategy, or concept direction.
        </label>
        <textarea
          id="insight-prompt"
          className="h-32 w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-platinum outline-none transition focus:border-accent"
          placeholder="Compose a warm strategic brief for a high-fashion digital launch..."
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
        />
        <button
          className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-platinum transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={isDisabled}
          type="submit"
        >
          Generate
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </form>

      {!enabled ? (
        <p className="mt-5 text-sm text-platinum/60">
          Add <code>OPENROUTER_API_KEY</code> in <code>.env.local</code> to activate
          this experience.
        </p>
      ) : null}

      {result ? (
        <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4">
          <p className="display-type mb-2 text-[11px] text-gold">
            {status === "error" ? "System Note" : "Response"}
          </p>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-platinum/90">
            {result}
          </p>
        </div>
      ) : null}
    </div>
  );
}
