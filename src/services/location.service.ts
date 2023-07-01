import { locationDto } from '@/dtos/location.dto';
import { ErrorEnum } from '@/exceptions/errorCodes';
import { HttpException } from '@/exceptions/httpException';
import { GeolocationRemote } from '@/remote/location/geolocation.remote';

class locationService {
  public async getCoordinates(data: locationDto) {
    try {
      const address = data.address;
      const key = Object.keys(address);
      let addressLine = ' ';
      console.log(key.length);
      for (let index = 0; index < key.length; index++) {
        if (key[index] == 'type') {
          continue;
        }
        addressLine = addressLine + ` ${address[key[index]]}`;
      }
      const res = await GeolocationRemote.getCoordinates(addressLine);
      const pointCoordinates = res.features[0].geometry.coordinates;
      const boxCoordinates = res.features[0].bbox;

      return { pointCoordinates, boxCoordinates };
    } catch (error) {
      throw new HttpException(ErrorEnum.ADDRESS_NOT_FOUND);
    }
  }
}

export const LocationService = new locationService();
