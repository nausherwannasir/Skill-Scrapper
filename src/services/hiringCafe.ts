import axios from 'axios';
import { ApiResponse, JobResult } from '../models/job';
import { HIRING_CAFE_API_URL, PAGE_SIZE, MAX_PAGES } from '../config/default';

/**
 * Fetch one page of jobs for given keywords.
 */
export async function fetchJobs(
  keywords: string,
  page: number
): Promise<ApiResponse> {
  const payload = {
    size: PAGE_SIZE,
    page,
    searchState: { searchQuery: keywords, sortBy: 'date' }
  };
  const resp = await axios.post<ApiResponse>(HIRING_CAFE_API_URL, payload);
  return resp.data;
}

/**
 * Fetch up to MAX_PAGES pages and return all JobResult items.
 */
export async function fetchAllJobs(
  keywords: string
): Promise<JobResult[]> {
  const all: JobResult[] = [];
  for (let i = 0; i < MAX_PAGES; i++) {
    const { results } = await fetchJobs(keywords, i);
    if (!results.length) break;
    all.push(...results);
  }
  return all;
}
