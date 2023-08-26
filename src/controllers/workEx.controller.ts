import { SendPeerLinkDTO } from '@/dtos/verification.dto';
import { ErrorEnum } from '@/exceptions/errorCodes';
import { verfication } from '@/remote/peer/verification';
import { Controller } from '@/utils/decorators/controller';
import { Post } from '@/utils/decorators/methods';
import { Body } from '@/utils/decorators/request';
import { HttpException } from '@exceptions/httpException';

@Controller('/verification')
export default class WorkExController {
  @Post('/send')
  async sendPeerLinks(@Body() data: SendPeerLinkDTO) {
    console.log(data);
    try {
      await Promise.all([
        verfication.sendMail(data.verifierName, data.userName, data.companyName, data.email, data.emailVerificationLink),
        // verfication.requestOnMobile(data.verifierName, data.userName, data.companyName, data.phone, data.mobileVerificationLink),
      ]);
      return { message: 'Verification link sent' };
    } catch (error) {
      throw new HttpException(ErrorEnum.VERIFICATIONLINK_NOT_SENT);
    }
  }
}
