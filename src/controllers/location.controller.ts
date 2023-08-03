import { locationDto } from '@/dtos/location.dto';
import { LocationService } from '@/services/location.service';
import { Controller } from '@/utils/decorators/controller';
import { Get, Post } from '@/utils/decorators/methods';
import { Body, Query } from '@/utils/decorators/request';

@Controller('/location')
export default class LocationController {
  @Post('/geolocation')
  async getCity(@Body() data: locationDto) {
    return LocationService.getCoordinates(data);
  }
  @Get('/suggestion')
  async getSuggestion(@Query('address') address: string, @Query('latitude') latitude: number, @Query('longitude') longitude: number) {
    return LocationService.getLocationSuggestion(address, {
      latitude, longitude
    });
  }
}
