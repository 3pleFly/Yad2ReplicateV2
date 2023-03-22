export interface GovtAPIData{
  help: string;
  success: boolean;
  result: GovtAPIDataResult;
}

export interface GovtAPIDataResult {
  include_total: boolean;
  limit: number;
  q: string;
  records_format: string;
  resource_id: string;
  total_estimation_threshold: string;
  records: GovtApiDataRecords[];
}

export interface GovtApiDataRecords {
  שם_רחוב: string;
  שם_ישוב: string;
}
