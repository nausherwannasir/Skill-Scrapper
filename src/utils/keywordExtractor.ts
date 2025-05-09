import { STOPWORDS } from './stopwords';

/**
 * Extract all words of length >= minLen, filter out stopwords,
 * and count their occurrences across descriptions.
 */
export function extractKeywords(
  descriptions: string[],
  minLen = 4
): Map<string, number> {
  const counts = new Map<string, number>();

  for (const desc of descriptions) {
    // match words of letters only, at least minLen long
    const words = desc
      .toLowerCase()
      .match(new RegExp(`\\b[a-z]{${minLen},}\\b`, 'g'));
    if (!words) continue;

    for (const w of words) {
      if (STOPWORDS.has(w)) continue;
      counts.set(w, (counts.get(w) || 0) + 1);
    }
  }

  return counts;
}
