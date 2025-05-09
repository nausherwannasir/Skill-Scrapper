// src/config/default.ts
import dotenv from 'dotenv';

dotenv.config();

export const HIRING_CAFE_API_URL =
  process.env.HIRING_CAFE_API_URL ||
  'https://hiring.cafe/api/search-jobs';

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 20;
export const MAX_PAGES = Number(process.env.MAX_PAGES) || 5;
