// src/models/job.ts

export interface GeoLocation {
    lat: number;
    lon: number;
  }
  
  export interface JobInformation {
    title: string;
    description: string;
  }
  
  export interface ProcessedJobData {
    company_name: string;
    is_compensation_transparent: boolean;
    yearly_min_compensation?: number;
    yearly_max_compensation?: number;
    workplace_type?: string;
    requirements_summary?: string;
    job_category: string;
    role_activities: string[];
    formatted_workplace_location?: string;
    estimated_publish_date_millis: string;
  }
  
  export interface JobResult {
    id: string;
    apply_url: string;
    job_information: JobInformation;
    v5_processed_job_data: ProcessedJobData;
    _geoloc: GeoLocation[];
  }
  
  export interface ApiResponse {
    results: JobResult[];
    total: number;
  }
  