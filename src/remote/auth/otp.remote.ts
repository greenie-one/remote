import { env } from '@/config';
import { ErrorEnum } from '@/exceptions/errorCodes';
import { HttpException } from '@/exceptions/httpException';
import ejs from 'ejs';
import { mailer } from '../generic/emailer';
import { HttpClient } from '../generic/httpClient';

const TL_API_KEY = env('TL_API_KEY');

export class AuthRemote {
  static async requestOtpMobile(mobileNumber: string, otp: string) {
    const body = await ejs.renderFile('templates/sms/otpTemplate.ejs', { otp });
    try {
      return HttpClient.callApi({
        url: `https://api.textlocal.in/send/`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
          apikey: TL_API_KEY,
          numbers: mobileNumber,
          sender: 'OTPGRN',
          message: body,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(ErrorEnum.SMS_NOT_SENT);
    }
  }

  static async requestOtpEmail(email: string, otp: string) {
    const html = await ejs.renderFile('templates/email/otpTemplate.ejs', { otp });
    try {
      return mailer.sendMail({
        to: email,
        subject: 'Greenie login',
        html,
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(ErrorEnum.MAIL_NOT_SENT);
    }
  }
}
