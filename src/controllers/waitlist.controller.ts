import { WaitlistDto } from '@/dtos/waitlist.dto';
import { ErrorEnum } from '@/exceptions/errorCodes';
import { WaitlistMailer } from '@/remote/email/waitlist';
import { Controller } from '@/utils/decorators/controller';
import { Post } from '@/utils/decorators/methods';
import { Body } from '@/utils/decorators/request';
import { HttpException } from '@exceptions/httpException';

@Controller('/waitlist')
export default class WaitlistController {
  @Post('/send')
  async sendWaitlistEmail(@Body() data: WaitlistDto) {
    try {
      WaitlistMailer.sendMail(data.name, data.email);
      return { message: 'Email sent' };
    } catch (error) {
      throw new HttpException(ErrorEnum.EMAIL_NOT_SENT);
    }
  }
}
