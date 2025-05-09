import OpenAI from "openai";
import { config as loadEnv } from "dotenv";
loadEnv();

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY in .env");
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function extractSkillsAI(
  requirements: string[]
): Promise<string[]> {
  // Only include up to 50 lines to keep the prompt small and fast
  const lines = requirements.slice(0, 50);

  const messages: any[] = [
    {
      role: "system",
      content:
        "You are an expert at pulling out *technical* skills from job descriptions.",
    },
    {
      role: "user",
      content:
        "From the following job requirement lines, return only a JSON array of unique *technical* skills (programming languages, frameworks, libraries, tools, platforms, DevOps/cloud services, and methodologies). " +
        "Exclude human languages, driver’s licenses, certifications, degrees, soft-skills, or any unrelated items. " +
        "Do not return anything but the JSON array:\n\n" +
        lines.join("\n"),
    },
  ];

  const resp = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages as any[],
    temperature: 0,
  });

  let reply = resp.choices?.[0]?.message?.content ?? "[]";

  // Strip code fences if any
  reply = reply.trim().replace(/^```(?:json)?/, "").replace(/```$/g, "").trim();

  try {
    const parsed = JSON.parse(reply);
    if (Array.isArray(parsed)) {
      return Array.from(new Set(parsed.map((s) => s.trim())));
    }
  } catch {
    console.error("Failed to parse AI response:", reply);
  }
  return [];
}
