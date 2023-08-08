import { env } from '@/config';
import { HeadersInit, Response } from 'undici';
import { DummyAadharOtpResponse, DummyAadharVerifyResponse, DummyDLResponse, DummyPanResponse } from './dummy.response';

const JSONHeaders = {
  'Content-Type': 'application/json',
};

export const mockList: Record<string, { response: unknown; headers?: HeadersInit }> = {
  [`${env('ZOOP_BASE_URL')}/in/identity/okyc/otp/request`]: {
    response: DummyAadharOtpResponse,
    headers: JSONHeaders,
  },
  [`${env('ZOOP_BASE_URL')}/in/identity/okyc/otp/verify`]: {
    response: DummyAadharVerifyResponse,
    headers: JSONHeaders,
  },
  [`${env('ZOOP_BASE_URL')}/api/v1/in/identity/dl/advance`]: {
    response: DummyDLResponse,
    headers: JSONHeaders,
  },
  [`${env('ZOOP_BASE_URL')}/api/v1/in/identity/pan/pro`]: {
    response: DummyPanResponse,
    headers: JSONHeaders,
  },
};

export function mockFetch() {
  const originalFetch = fetch;

  async function newFetch(...args: Parameters<typeof fetch>) {
    const url = args[0].toString();
    const resp = mockList[url];
    if (resp) {
      console.debug('Responding with mock data for', url);
      const data = new Response(Buffer.from(JSON.stringify(resp.response)), {
        headers: resp.headers,
      });

      return data;
    }

    console.log('original fetch', originalFetch);
    return originalFetch(...args);
  }

  if (env('APP_ENV') !== 'production') {
    fetch = newFetch;
  }
}
