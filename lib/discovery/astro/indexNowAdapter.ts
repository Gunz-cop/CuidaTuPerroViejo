import type { DestinationAdapter, SubmissionResult, UrlState } from '../core/types';

export class IndexNowAdapter implements DestinationAdapter {
  name = 'indexnow';
  private host: string;
  private key: string;
  private keyLocation?: string;

  constructor(host: string, key: string, keyLocation?: string) {
    this.host = host;
    this.key = key;
    this.keyLocation = keyLocation || `https://${host}/${key}.txt`;
  }

  async submit(urls: UrlState[]): Promise<SubmissionResult> {
    const urlList = urls.map(u => u.url);
    const payload = {
      host: this.host,
      key: this.key,
      keyLocation: this.keyLocation,
      urlList
    };

    try {
      const response = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const text = await response.text();
        return {
          success: false,
          submittedCount: 0,
          errors: urls.map(u => ({ url: u.url, error: `${response.statusText}: ${text}` }))
        };
      }

      return {
        success: true,
        submittedCount: urls.length
      };
    } catch (error: any) {
      return {
        success: false,
        submittedCount: 0,
        errors: urls.map(u => ({ url: u.url, error: error.message }))
      };
    }
  }
}
