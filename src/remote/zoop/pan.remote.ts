import { env } from '@/config';
import { HttpClient } from '../generic/httpClient';

export class PanVerification {
  static async verifyPan(panNumber: string, taskId: string): Promise<unknown> {
    return HttpClient.callApi({
      url: `${env('ZOOP_BASE_URL')}/api/v1/in/identity/pan/pro`,
      method: 'POST',
      headers: {
        'app-id': env('ZOOP_ID'),
        'api-key': env('ZOOP_KEY'),
        'Content-Type': 'application/json',
      },
      body: {
        mode: 'sync',
        data: {
          customer_pan_number: panNumber,
          consent: 'Y',
          consent_text: 'I hereby declare my consent agreement for fetching my information via ZOOP API',
        },
        task_id: taskId,
      },
    });
  }
}
