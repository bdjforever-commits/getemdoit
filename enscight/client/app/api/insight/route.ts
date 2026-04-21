import { NextResponse } from "next/server";
import env from "@/lib/env";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

type OpenRouterChoice = {
  message?: {
    content?: string;
  };
};

type OpenRouterResponse = {
  choices?: OpenRouterChoice[];
};

export async function POST(req: Request) {
  const openRouterKey = env.openRouterApiKey;

  if (!openRouterKey) {
    return NextResponse.json(
      { error: "OPENROUTER_API_KEY is missing. Add it to your environment." },
      { status: 500 },
    );
  }

  let body: { prompt?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const prompt = body.prompt?.trim();

  if (!prompt) {
    return NextResponse.json(
      { error: "Prompt is required." },
      { status: 400 },
    );
  }

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openRouterKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": env.openRouterSiteUrl,
      "X-Title": "ENSCIGHT Phase 1",
    },
    body: JSON.stringify({
      model: env.openRouterModel,
      messages: [
        {
          role: "system",
          content:
            "You are ENSCIGHT's creative intelligence. Keep responses warm, poetic, precise, and human. Avoid robotic wording.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    return NextResponse.json(
      { error: "OpenRouter request failed.", details },
      { status: response.status },
    );
  }

  const data = (await response.json()) as OpenRouterResponse;
  const content = data.choices?.[0]?.message?.content?.trim();

  return NextResponse.json({
    output:
      content ??
      "The signal came back incomplete. Try guiding ENSCIGHT with a little more detail.",
  });
}
