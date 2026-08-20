import { APP_CONFIG } from '../config';

export interface RequestOptions extends RequestInit {
  timeout?: number;
}

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'HttpError';
  }
}

export async function httpClient<T = unknown>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const { timeout = APP_CONFIG.apiTimeout, headers = {}, ...customConfig } = options;

  const requestUrl = /^https?:\/\//i.test(url)
    ? url
    : `${APP_CONFIG.apiBaseUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;


  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const config: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    signal: controller.signal,
    ...customConfig,
  };

  try {
    const response = await fetch(requestUrl, config);
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new HttpError(response.status, `HTTP Exception: ${response.statusText}`);
    }

    // 处理 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return (await response.json()) as T;
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request Timeout after ${timeout}ms: ${url}`);
    }
    throw error;
  }
}

