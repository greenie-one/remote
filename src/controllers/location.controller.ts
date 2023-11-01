import { ResidentialPeerDTO } from '@/dtos/verification.dto';
import { ErrorEnum } from '@/exceptions/errorCodes';
import { HttpException } from '@/exceptions/httpException';
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
    console.log(data);
    try {
      await Promise.all([
        LocationVerfication.sendMail(data.verifierName, data.userName, data.email, data.emailVerificationLink),
        LocationVerfication.requestOnMobile(data.verifierName, data.userName, data.phone, data.mobileVerificationLink),
      ]);
      return { message: 'Verification link sent' };
    } catch (error) {
      console.error(error);
      throw new HttpException(ErrorEnum.VERIFICATIONLINK_NOT_SENT);
    }
  }
}
