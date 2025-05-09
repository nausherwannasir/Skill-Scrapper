// src/index.ts
import { fetchAllJobs } from "./services/hiringCafe";
import { isItJob } from "./utils/jobFilter";
import { extractSkillsAI } from "./utils/skillExtractorAI";

async function main(): Promise<void> {
  const keywords: string = process.argv[2] || "";
  if (!keywords) {
    console.error('Usage: npm start -- "<keywords>"');
    process.exit(1);
  }

  console.log("Fetching jobs for: \"" + keywords + "\"\n");
  const allJobs = await fetchAllJobs(keywords);

  // 1) Filter to Canada
  const canadaJobs = allJobs.filter((job) => {
    const loc = job.v5_processed_job_data.formatted_workplace_location || "";
    return loc.toLowerCase().includes("canada");
  });

  // 2) Then filter to IT roles
  const itCanadaJobs = canadaJobs.filter(isItJob);

  console.log("Total fetched:      " + allJobs.length);
  console.log("In Canada:         " + canadaJobs.length);
  console.log("IT jobs in Canada: " + itCanadaJobs.length + "\n");

  // Gather all requirement summaries
  const allReq = itCanadaJobs.map(
    (j) => j.v5_processed_job_data.requirements_summary || ""
  );

  // Deduplicate and limit to 50 lines for the AI prompt
  const uniqueReq = Array.from(new Set(allReq));
  const promptLines = uniqueReq.slice(0, 50);

  console.log(
    "Analyzing top " + promptLines.length + " requirement lines with AI...\n"
  );
  const skills = await extractSkillsAI(promptLines);

  // Count frequencies across all jobs
  const freq = new Map<string, number>();
  allReq.forEach((line) => {
    skills.forEach((skill) => {
      if (line.toLowerCase().includes(skill.toLowerCase())) {
        freq.set(skill, (freq.get(skill) || 0) + 1);
      }
    });
  });

  // Sort and take top 20
  const top20 = Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  console.log("Top 20 Technical IT Skills in Canada:\n");
  top20.forEach(([skill, count]) => {
    console.log(skill + ": " + count);
  });
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
