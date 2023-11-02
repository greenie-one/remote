import axios from 'axios';
import { env } from '@/config';

interface Message {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

class Mailer {
  public async sendMail(mailOptions: Omit<Message, 'from'>) {
    const body = {
      FromEmail: 'info@greenie.one',
      FromName: 'Greenie One',
      Subject: mailOptions.subject,
      'Html-part': mailOptions.html,
      Recipients: [{ Email: mailOptions.to }],
    };
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.mailjet.com/v3/send',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${env('MJ_TOKEN')}`,
      },
      data: body,
    };
    const res = await axios.request(config);
    return res;
  }
}
export const mailer = new Mailer();
