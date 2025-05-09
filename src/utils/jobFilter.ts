import { JobResult } from '../models/job';

/**
 * List of terms that suggest an IT role.
 * You can expand this as needed.
 */
const IT_KEYWORDS = [
  'engineer',
  'developer',
  'it',
  'software',
  'system',
  'network',
  'security',
  'devops',
  'data',
  'analyst',
  'cloud',
  'infrastructure'
];

/**
 * Return true if the job looks IT-related based on title or category.
 */
export function isItJob(job: JobResult): boolean {
  const title = job.job_information.title.toLowerCase();
  const category = job.v5_processed_job_data.job_category.toLowerCase();
  return IT_KEYWORDS.some(term => 
    title.includes(term) || category.includes(term)
  );
}
