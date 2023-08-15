import { emailerDto } from '@/dtos/emailer.dto';
import { emailService } from '@/services/emailer.service';
import { Controller } from '@/utils/decorators/controller';
import { Post } from '@/utils/decorators/methods';
import { Body } from '@/utils/decorators/request';

@Controller('/emailer')
export default class EmailerController {
  @Post('/send')
  async sendEmail(@Body() data: emailerDto) {
    return emailService.sendEmail(data);
  }
}
