import { locationDto } from '@/dtos/location.dto';
import { ErrorEnum } from '@/exceptions/errorCodes';
import { HttpException } from '@/exceptions/httpException';
import { GeolocationRemote } from '@/remote/location/geolocation.remote';

class locationService {
  public async getCoordinates(data: locationDto) {
    try {
      const res = await GeolocationRemote.getCoordinates(data.address);
      const pointCoordinates = res.features[0].geometry.coordinates;
      const boxCoordinates = res.features[0].bbox;

      return { pointCoordinates, boxCoordinates };
    } catch (error) {
      throw new HttpException(ErrorEnum.ADDRESS_NOT_FOUND);
    }
  }
}

export const LocationService = new locationService();
