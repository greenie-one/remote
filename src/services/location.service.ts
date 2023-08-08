import { locationDto } from '@/dtos/location.dto';
import { ErrorEnum } from '@/exceptions/errorCodes';
import { HttpException } from '@/exceptions/httpException';
import { GeolocationRemote, Location } from '@/remote/location/geolocation.remote';

class locationService {
  public async getCoordinates(data: locationDto) {
    const address = data.address;
    try {
      const res = await GeolocationRemote.getCoordinates(address);
      if (res.features.length === 0) {
        throw new HttpException(ErrorEnum.ADDRESS_NOT_FOUND);
      }
      const pointCoordinates = res.features[0].geometry.coordinates;
      return { long: pointCoordinates[0], lat: pointCoordinates[1] };
    } catch (error) {
      console.error(error);
      throw new HttpException(ErrorEnum.SERVER_ERROR, error.message);
    }
  }

  public async getLocationSuggestion(partialAddress: string, locationBias: Location) {
    try {
      const res = await GeolocationRemote.getSuggestion(partialAddress, locationBias);
      return res;
    } catch (error) {
      console.error(error);
      throw new HttpException(ErrorEnum.ADDRESS_NOT_FOUND);
    }
  }
}

export const LocationService = new locationService();
