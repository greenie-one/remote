import { SendOtpDto } from '@/dtos/otp.dto';
import { HttpException } from '@/exceptions/httpException';
import { ErrorEnum } from '@/exceptions/errorCodes';
import { AuthRemote } from '@/remote/auth/otp.remote';

class sendOtpService {
  public async sendOtp(sendOtpDto: SendOtpDto) {
    try {
      if (sendOtpDto.type === 'EMAIL') {
        await AuthRemote.requestOtpEmail(sendOtpDto.contact, sendOtpDto.otp);
        return { message: 'OTP sent successfully' };
      }

      if (sendOtpDto.type === 'MOBILE') {
        await AuthRemote.requestOtpMobile(sendOtpDto.contact, sendOtpDto.otp);
        return { message: 'OTP sent successfully' };
      }
    } catch (error) {
      throw new HttpException(ErrorEnum.OTP_NOT_SENT);
    }
  }
}

export const SendOtpService = new sendOtpService();
