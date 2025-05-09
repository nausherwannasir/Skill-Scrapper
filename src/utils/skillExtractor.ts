// src/utils/skillExtractor.ts

/**
 * A static list of common IT skills.
 */
export const SKILLS = [
    'Python',
    'JavaScript',
    'Java',
    'C#',
    'AWS',
    'Docker',
    'Kubernetes',
    'SQL',
    'React',
    'Node.js',
  ];
  
  /** Escape regex metacharacters in a string. */
  function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  /**
   * Count how many times each skill appears in the array of description strings.
   * Uses word boundaries so 'Java' doesn't match 'JavaScript'.
   */
  export function extractSkills(descriptions: string[]): Map<string, number> {
    const counts = new Map<string, number>(
      SKILLS.map((skill) => [skill, 0] as [string, number])
    );
  
    for (const desc of descriptions) {
      const text = desc.toLowerCase();
      for (const skill of SKILLS) {
        const pat = '\\b' + escapeRegex(skill.toLowerCase()) + '\\b';
        const re = new RegExp(pat, 'g');
        if (re.test(text)) {
          counts.set(skill, (counts.get(skill) || 0) + 1);
        }
      }
    }
  
    return counts;
  }
  