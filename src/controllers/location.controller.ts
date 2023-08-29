import { LocationService } from '@/services/location.service';
import { Controller } from '@/utils/decorators/controller';
import { Get } from '@/utils/decorators/methods';
import { Query } from '@/utils/decorators/request';

@Controller('/location')
export default class LocationController {
  @Get('/coordinates')
  async getCoordinates(@Query('address', true) address: string, @Query('placeId', true) placeId: string) {
    return LocationService.getCoordinates(address, placeId);
  }
  @Get('/suggestion')
  async getSuggestion(@Query('address') address: string) {
    return LocationService.getLocationSuggestion(address);
  }
}
