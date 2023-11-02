import { env } from '@/config';
import { ErrorEnum } from '@/exceptions/errorCodes';
import { HttpException } from '@/exceptions/httpException';
import ejs from 'ejs';
import { mailer } from '../generic/emailer';
import { HttpClient } from '../generic/httpClient';

const TL_API_KEY = env('TL_API_KEY');

export class WorkVerfication {
  static async sendMail(firstName: string, userName: string, companyName: string, email: string, verificationLink: string) {
    const html = await ejs.renderFile('templates/email/peerVerfication.ejs', { firstName, userName, verificationLink, companyName });
    try {
      return mailer.sendMail({
        to: email,
        subject: 'Verify Work Experience',
        html,
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(ErrorEnum.MAIL_NOT_SENT);
    }
  }

  static async requestOnMobile(firstName: string, userName: string, companyName: string, phone: string, verificationLink: string) {
    const body = await ejs.renderFile('templates/sms/workVerificationTemplate.ejs', { userName, verificationLink, companyName });
    try {
      return await HttpClient.callApi({
        url: `https://api.textlocal.in/send/`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
          apikey: TL_API_KEY,
          numbers: phone,
          sender: 'GRNTXT',
          message: body,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(ErrorEnum.SMS_NOT_SENT);
    }
  }
}

export class LocationVerfication {
  static async sendMail(firstName: string, userName: string, email: string, verificationLink: string) {
    const html = await ejs.renderFile('templates/email/locationVerificationTemplate.ejs', { firstName, userName, verificationLink });
    try {
      return mailer.sendMail({
        to: email,
        subject: 'Verify Location',
        html,
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(ErrorEnum.MAIL_NOT_SENT);
    }
  }

  static async requestOnMobile(firstName: string, userName: string, phone: string, verificationLink: string) {
    const body = await ejs.renderFile('templates/sms/locationVerificationTemplate.ejs', { userName, verificationLink, firstName });
    try {
      return HttpClient.callApi({
        url: `https://api.textlocal.in/send/`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
          apikey: TL_API_KEY,
          numbers: phone,
          sender: 'GRNTXT',
          message: body,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(ErrorEnum.SMS_NOT_SENT);
    }
  }
}
