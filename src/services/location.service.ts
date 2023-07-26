import { locationDto } from '@/dtos/location.dto';
import { ErrorEnum } from '@/exceptions/errorCodes';
import { HttpException } from '@/exceptions/httpException';
import { GeolocationRemote } from '@/remote/location/geolocation.remote';

class locationService {
  public async getCoordinates(data: locationDto) {
    try {
      const address = data.address;
      const res = await GeolocationRemote.getCoordinates(address);
      const pointCoordinates = res.features[0].geometry.coordinates;

      return { long: pointCoordinates[0], lat: pointCoordinates[1] };
    } catch (error) {
      throw new HttpException(ErrorEnum.ADDRESS_NOT_FOUND);
    }
  }

  public async getLocationSuggestion(partialAddress: string) {
    try {
      const res = await GeolocationRemote.getSuggestion(partialAddress);
      return res;
    } catch (error) {
      throw new HttpException(ErrorEnum.ADDRESS_NOT_FOUND);
    }
  }
}

export const LocationService = new locationService();
