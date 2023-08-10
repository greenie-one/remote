import { env } from '@/config';
import { HttpClient } from '../generic/httpClient';

export class AadhaarVerification {
  static async requestAadharOtp(aadhaarNumber: string, taskId: string): Promise<unknown> {
    return HttpClient.callApi({
      url: `${env('ZOOP_BASE_URL')}/in/identity/okyc/otp/request`,
      method: 'POST',
      headers: {
        'app-id': env('ZOOP_ID'),
        'api-key': env('ZOOP_KEY'),
        'Content-Type': 'application/json',
      },
      body: {
        data: {
          customer_aadhaar_number: aadhaarNumber,
          consent: 'Y',
          consent_text: 'I hereby declare my consent agreement for fetching my information via ZOOP API',
        },
        task_id: taskId,
      },
    });
  }

  static async verifyAadharOtp(requestId: string, otp: string, taskId: string): Promise<unknown> {
    return HttpClient.callApi({
      url: `${env('ZOOP_BASE_URL')}/in/identity/okyc/otp/verify`,
      method: 'POST',
      headers: {
        'app-id': env('ZOOP_ID'),
        'api-key': env('ZOOP_KEY'),
        'Content-Type': 'application/json',
      },
      body: {
        data: {
          request_id: `${requestId}`,
          otp: `${otp}`,
          consent: 'Y',
          consent_text: 'I hear by declare my consent agreement for fetching my information via ZOOP API',
        },
        task_id: `${taskId}`,
      },
    });
  }
}
