import { extractSkills, SKILLS } from '../../src/utils/skillExtractor';

describe('extractSkills', () => {
  it('counts each skill occurrence', () => {
    const texts = [
      'I use Python and AWS daily',
      'JavaScript rocks',
      'No skills here'
    ];
    const counts = extractSkills(texts);
    expect(counts.get('Python')).toBe(1);
    expect(counts.get('AWS')).toBe(1);
    expect(counts.get('JavaScript')).toBe(1);
    expect(counts.get('Java')).toBe(0);
  });
});
