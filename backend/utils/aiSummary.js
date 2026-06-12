import OpenAI from "openai";

const SUMMARY_PROMPT = `You are a document version control assistant. Given the OLD and NEW content of a document, write a concise 1-2 sentence human-readable summary of what changed. Focus on meaning, not formatting. Be specific when possible.

OLD CONTENT:
---
{oldText}
---

NEW CONTENT:
---
{newText}
---

Respond with only the summary, no quotes or preamble.`;

function stripHtml(html) {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text, max = 4000) {
  if (!text || text.length <= max) return text || "";
  return `${text.slice(0, max)}\n...[truncated]`;
}

export function ruleBasedSummary(oldText, newText) {
  const oldPlain = stripHtml(oldText);
  const newPlain = stripHtml(newText);

  if (!oldPlain) {
    return "Initial version of the document created.";
  }

  if (newPlain.length > oldPlain.length + 20) {
    return "New content was added to the document.";
  }

  if (newPlain.length < oldPlain.length - 20) {
    return "Some content was removed from the document.";
  }

  return "The document content was updated.";
}

function resolveProvider() {
  const configured = process.env.AI_PROVIDER?.toLowerCase();

  if (configured === "anthropic" && process.env.ANTHROPIC_API_KEY) {
    return "anthropic";
  }
  if (configured === "openai" && process.env.OPENAI_API_KEY) {
    return "openai";
  }
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  if (process.env.OPENAI_API_KEY) return "openai";
  return null;
}

async function generateWithOpenAI(oldText, newText) {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = SUMMARY_PROMPT.replace("{oldText}", truncate(stripHtml(oldText)))
    .replace("{newText}", truncate(stripHtml(newText)));

  const response = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 150,
    temperature: 0.3,
  });

  return response.choices[0]?.message?.content?.trim() || ruleBasedSummary(oldText, newText);
}

async function generateWithAnthropic(oldText, newText) {
  const prompt = SUMMARY_PROMPT.replace("{oldText}", truncate(stripHtml(oldText)))
    .replace("{newText}", truncate(stripHtml(newText)));

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6",
      max_tokens: 150,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Anthropic API error: ${err}`);
  }

  const data = await response.json();
  return data.content?.[0]?.text?.trim() || ruleBasedSummary(oldText, newText);
}

export async function generateSummary(oldText, newText) {
  const provider = resolveProvider();

  if (!provider) {
    return ruleBasedSummary(oldText, newText);
  }

  try {
    if (provider === "anthropic") {
      return await generateWithAnthropic(oldText, newText);
    }
    return await generateWithOpenAI(oldText, newText);
  } catch (error) {
    console.error(`AI summary failed (${provider}), using fallback:`, error.message);
    return ruleBasedSummary(oldText, newText);
  }
}
