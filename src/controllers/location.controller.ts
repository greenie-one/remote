import { ResidentialPeerDTO } from '@/dtos/verification.dto';
import { LocationVerfication } from '@/remote/peer/verification';
import { LocationService } from '@/services/location.service';
import { Controller } from '@/utils/decorators/controller';
import { Get, Post } from '@/utils/decorators/methods';
import { Body, Query } from '@/utils/decorators/request';

@Controller('/location')
export default class LocationController {
  @Get('/place')
  async getCoordinates(@Query('address', true) address: string, @Query('placeId', true) placeId: string) {
    return LocationService.getCoordinates(address, placeId);
  }
  @Get('/suggestion')
  async getSuggestion(@Query('address') address: string) {
    return LocationService.getLocationSuggestion(address);
  }

  @Post('/verification/send')
  async sendPeerLinks(@Body() data: ResidentialPeerDTO) {
    const sendEmail = LocationVerfication.sendMail(data.verifierName, data.userName, data.email, data.emailVerificationLink);
    const sendSms = LocationVerfication.requestOnMobile(data.verifierName, data.userName, data.phone, data.mobileVerificationLink);
    await Promise.all([sendEmail, sendSms]);
    return { message: 'Verification link sent' };
  }
}
