import { env } from '@/config';
import { SendOtpDto } from '@/dtos/otp.dto';
import { ErrorEnum } from '@/exceptions/errorCodes';
import { HttpException } from '@/exceptions/httpException';
import { AuthRemote } from '@/remote/auth/otp.remote';
import { generateRandomNumber } from '@/utils/otp';

class sendOtpService {
  private getOtp() {
    if (env('APP_ENV') !== 'production') {
      return '123456';
    }
    return generateRandomNumber().toString();
  }

  public async sendOtp(sendOtpDto: SendOtpDto) {
    try {
      const otp = this.getOtp();

      if (env('APP_ENV') === 'production') {
        if (sendOtpDto.type === 'EMAIL') {
          AuthRemote.requestOtpEmail(sendOtpDto.contact, otp).catch(console.error);
        }

        if (sendOtpDto.type === 'MOBILE') {
          AuthRemote.requestOtpMobile(sendOtpDto.contact, otp).catch(console.error);
        }
      }

      return { otp };
    } catch (error) {
      throw new HttpException(ErrorEnum.OTP_NOT_SENT);
    }
  }
}

export const SendOtpService = new sendOtpService();
