// src/utils/fetcher.ts
import axios from 'axios';
import { HIRING_CAFE_API_URL } from '../config/default';

const fetcher = axios.create({
  baseURL: HIRING_CAFE_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

export default fetcher;
