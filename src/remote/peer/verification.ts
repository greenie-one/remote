// import { env } from '@/config';
// import { ErrorEnum } from '@/exceptions/errorCodes';
// import { HttpException } from '@/exceptions/httpException';
import ejs from 'ejs';
import { mailer } from '../generic/emailer';
// import { HttpClient } from '../generic/httpClient';

// const ACCOUNT_SID = env('TWILIO_ACCOUNT_SID');
// const AUTH_TOKEN = env('TWILIO_AUTH_TOKEN');
// const FROM_MOBILE = env('TWILIO_FROM_MOBILE');

export class verfication {
  static async sendMail(firstName: string, userName: string, companyName: string, email: string, verificationLink: string) {
    const html = await ejs.renderFile('templates/email/peerVerfication.ejs', { firstName, userName, verificationLink, companyName });
    return mailer.sendMail({
      to: email,
      subject: 'Verify Work Experience',
      html,
    });
  }

  // static async requestOnMobile(firstName: string, userName: string, companyName: string, phone: string, verificationLink: string) {
  //   const body = await ejs.renderFile('templates/sms/verificationTemplate.ejs', { firstName, userName, verificationLink, companyName });
  //   try {
  //     await HttpClient.callApi({
  //       url: `https://api.twilio.com/2010-04-01/Accounts/${ACCOUNT_SID}/Messages.json`,
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //         Authorization: `Basic ${Buffer.from(`${ACCOUNT_SID}:${AUTH_TOKEN}`).toString('base64')}`,
  //       },
  //       body: {
  //         To: phone,
  //         From: FROM_MOBILE,
  //         Body: body,
  //       },
  //     });
  //   } catch (error) {
  //     throw new HttpException(ErrorEnum.SERVER_ERROR, error);
  //   }
  // }
}
