import { env } from '@/config';
import { SendOtpDto } from '@/dtos/otp.dto';
import { ErrorEnum } from '@/exceptions/errorCodes';
import { HttpException } from '@/exceptions/httpException';
import { AuthRemote } from '@/remote/auth/otp.remote';
import { generateRandomNumber } from '@/utils/otp';

class SendOTPService {
  private getOtp(): string {
    return env('APP_ENV') !== 'production' ? '123456' : generateRandomNumber().toString();
  }

  public async sendOtp(sendOtpDto: SendOtpDto) {
    try {
      if (env('APP_ENV') === 'production') {
        let requestFunction: (contact: string, otp: string) => Promise<unknown>;

        if (sendOtpDto.type === 'EMAIL') {
          requestFunction = AuthRemote.requestOtpEmail;
        } else if (sendOtpDto.type === 'MOBILE') {
          requestFunction = AuthRemote.requestOtpMobile;
        } else {
          throw new Error('Invalid sendOtpDto type');
        }

        const otp = this.getOtp();
        await requestFunction(sendOtpDto.contact, otp);
        return { otp };
      }

      return { otp: this.getOtp() };
    } catch (error) {
      throw new HttpException(ErrorEnum.OTP_NOT_SENT);
    }
  }
}

export const SendOtpService = new SendOTPService();
