/**
 * Given a comma-separated line of skills,
 * return an array of trimmed skill names.
 */
export function parseCommaList(line: string): string[] {
    return line
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
  }
  