import axios from 'axios';
import { fetchJobs } from '../../src/services/hiringCafe';
import { ApiResponse } from '../../src/models/job';

jest.mock('axios');
const mocked = axios as jest.Mocked<typeof axios>;

describe('fetchJobs', () => {
  it('returns API data', async () => {
    const fake: ApiResponse = { results: [], total: 0 };
    mocked.post.mockResolvedValue({ data: fake });
    const res = await fetchJobs('test', 0);
    expect(res).toEqual(fake);
  });
});
