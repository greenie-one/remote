import { SendOtpDto } from '@/dtos/otp.dto';
import { SendOtpService } from '@/services/otp.service';
import { Controller } from '@/utils/decorators/controller';
import { Post } from '@/utils/decorators/methods';
import { Body } from '@/utils/decorators/request';

@Controller('/otp')
export default class OtpController {
  @Post('/send')
  async sendOtp(@Body() data: SendOtpDto) {
    return SendOtpService.sendOtp(data);
  }
}
