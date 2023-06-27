import { locationDto } from '@/dtos/location.dto';
import { LocationService } from '@/services/location.service';
import { Controller } from '@/utils/decorators/controller';
import { Post } from '@/utils/decorators/methods';
import { Body } from '@/utils/decorators/request';

@Controller('/location')
export default class LocationController {
  @Post('/geolocation')
  async getCity(@Body() data: locationDto) {
    return LocationService.getCoordinates(data);
  }
}
