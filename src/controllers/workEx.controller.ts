import { WorkPeerDTO } from '@/dtos/verification.dto';
import { WorkVerfication } from '@/remote/peer/verification';
import { Controller } from '@/utils/decorators/controller';
import { Post } from '@/utils/decorators/methods';
import { Body } from '@/utils/decorators/request';

@Controller('/work/verification')
export default class WorkExController {
  @Post('/send')
  async sendPeerLinks(@Body() data: WorkPeerDTO) {
    await Promise.all([
      WorkVerfication.sendMail(data.verifierName, data.userName, data.companyName, data.email, data.emailVerificationLink),
      WorkVerfication.requestOnMobile(data.verifierName, data.userName, data.companyName, data.phone, data.mobileVerificationLink),
    ]);
    return { message: 'Verification link sent' };
  }
}
