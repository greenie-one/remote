import { VerifyOtpDto } from '@/dtos/verification.dto';
import { ErrorEnum } from '@/exceptions/errorCodes';
import { verfication } from '@/remote/peer/verification';
import { Controller } from '@/utils/decorators/controller';
import { Post } from '@/utils/decorators/methods';
import { Body } from '@/utils/decorators/request';
import { HttpException } from '@exceptions/httpException';

@Controller('/verification')
export default class verificationController {
  @Post('/send')
  async sendWaitlistEmail(@Body() data: VerifyOtpDto) {
    try {
      verfication.sendMail(data.verifierName, data.email, data.userName, data.verificationLink);
      verfication.requestOnMobile(data.verifierName, data.userName, data.phone, data.verificationLink);
      return { message: 'Verification link sent' };
    } catch (error) {
      throw new HttpException(ErrorEnum.VERIFICATIONLINK_NOT_SENT);
    }
  }
}
