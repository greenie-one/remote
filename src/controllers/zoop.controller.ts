import { AadharOtp, AadharVerify, DrivingLicense, Pan } from '@/dtos/zoop.dto';
import { zoopService } from '@/services/zoop.service';
import { Controller } from '@/utils/decorators/controller';
import { Post } from '@/utils/decorators/methods';
import { Body } from '@/utils/decorators/request';

@Controller('/zoop')
export default class ZoopController {
  @Post('/aadhar/otp')
  async sendOtpAadhar(@Body() data: AadharOtp) {
    return zoopService.callAadharOtp(data.aadharNumber, data.taskId);
  }

  @Post('/aadhar/verify')
  async verifyAadhar(@Body() data: AadharVerify) {
    return zoopService.callAadharVerify(data.requestId, data.otp, data.taskId);
  }

  @Post('/pan')
  async verifyPan(@Body() data: Pan) {
    return zoopService.callPan(data.panNumber, data.taskId);
  }

  @Post('/driving-license')
  async verifyDrivingLicense(@Body() data: DrivingLicense) {
    return zoopService.callDrivingLicense(data.dlNumber, data.dob, data.taskId);
  }
}
