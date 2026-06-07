export interface UrlState {
  url: string;
  lastmod?: string;
  hash: string; // Hash of the HTML content (not the URL) to detect changes
}

export interface StateAdapter {
  get(key: string): Promise<UrlState | null>;
  set(key: string, state: UrlState): Promise<void>;
  delete(key: string): Promise<void>;
}

export interface DestinationAdapter {
  name: string;
  submit(urls: UrlState[]): Promise<SubmissionResult>;
}

export interface SubmissionResult {
  success: boolean;
  submittedCount: number;
  errors?: Array<{ url: string; error: string }>;
}
