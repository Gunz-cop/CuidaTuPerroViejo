import type { DestinationAdapter, SubmissionResult, UrlState } from '../core/types';
import * as crypto from 'crypto';

/**
 * Google Indexing API Adapter - @experimental
 * WARNING: Google officially restricts this API to JobPosting and BroadcastEvent metadata.
 * Submissions for standard content websites (like blogs) may be rejected, ignored, or penalized.
 * Use at your own risk.
 */
export class GoogleIndexingAdapter implements DestinationAdapter {
  name = 'google';
  private clientEmail: string;
  private privateKey: string;

  constructor(clientEmail: string, privateKey: string) {
    this.clientEmail = clientEmail;
    // Handle single-line env variable formatting for private keys containing escaped newlines
    this.privateKey = privateKey.replace(/\\n/g, '\n');
  }

  async submit(urls: UrlState[]): Promise<SubmissionResult> {
    try {
      const accessToken = await this.getAccessToken();
      const errors: Array<{ url: string; error: string }> = [];
      let successCount = 0;

      // Submit each URL individually (Google Indexing API limit is 1 URL per notification call)
      for (const item of urls) {
        try {
          const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
              url: item.url,
              type: 'URL_UPDATED'
            })
          });

          if (!res.ok) {
            const errText = await res.text();
            errors.push({ url: item.url, error: `${res.statusText}: ${errText}` });
          } else {
            successCount++;
          }
        } catch (e: any) {
          errors.push({ url: item.url, error: e.message });
        }
      }

      return {
        success: errors.length === 0,
        submittedCount: successCount,
        errors: errors.length > 0 ? errors : undefined
      };
    } catch (err: any) {
      return {
        success: false,
        submittedCount: 0,
        errors: urls.map(u => ({ url: u.url, error: `Authentication failed: ${err.message}` }))
      };
    }
  }

  private async getAccessToken(): Promise<string> {
    const base64url = (str: string | Buffer): string => {
      const buf = typeof str === 'string' ? Buffer.from(str) : str;
      return buf.toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
    };

    const header = JSON.stringify({ alg: 'RS256', typ: 'JWT' });
    const now = Math.floor(Date.now() / 1000);
    const claim = JSON.stringify({
      iss: this.clientEmail,
      scope: 'https://www.googleapis.com/auth/indexing',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now
    });

    const signatureInput = `${base64url(header)}.${base64url(claim)}`;
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(signatureInput);
    const signature = sign.sign(this.privateKey);
    const jwt = `${signatureInput}.${base64url(signature)}`;

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`${response.statusText} - ${errorText}`);
    }

    const data = (await response.json()) as { access_token: string };
    return data.access_token;
  }
}
