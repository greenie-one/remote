import { env } from '@/config';
import { HttpClient } from './httpClient';

interface Message {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

class Mailer {
  public async sendMail(mailOptions: Omit<Message, 'from'>) {
    return await HttpClient.callApi({
      url: 'https://api.mailjet.com/v3/send',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${env('MJ_TOKEN')}`,
      },
      body: {
        FromEmail: 'info@greenie.one',
        FromName: 'Greenie One',
        Subject: mailOptions.subject,
        'Html-part': mailOptions.html,
        Recipients: [{ Email: mailOptions.to }],
      },
    });
  }
}
export const mailer = new Mailer();
