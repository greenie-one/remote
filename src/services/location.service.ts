import { locationDto } from '@/dtos/location.dto';
import { ErrorEnum } from '@/exceptions/errorCodes';
import { HttpException } from '@/exceptions/httpException';
import { GeolocationRemote } from '@/remote/location/geolocation.remote';

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

  public async getLocationSuggestion(partialAddress: string) {
    try {
      const data = await GeolocationRemote.getSuggestion(partialAddress);
      const response = data.predictions.map((prediction) => ({
        description: prediction.description,
        placeId: prediction.place_id,
      }));

      return response;
    } catch (error) {
      console.error(error);
      throw new HttpException(ErrorEnum.ADDRESS_NOT_FOUND);
    }
  }

  public async getPlaceDetails(placeId: string) {
    try {
      const data = await GeolocationRemote.getPlaceDetails(placeId);
      const adr_address = data.result.adr_address;

      const extendedAddressMatch = adr_address.match(/<span class="extended-address">(.*?)<\/span>/);
      const localityMatch = adr_address.match(/<span class="locality">(.*?)<\/span>/);
      const regionMatch = adr_address.match(/<span class="region">(.*?)<\/span>/);
      const postalCodeMatch = adr_address.match(/<span class="postal-code">(.*?)<\/span>/);
      const countryNameMatch = adr_address.match(/<span class="country-name">(.*?)<\/span>/);
      const streetAddressMatch = adr_address.match(/<span class="street-address">(.*?)<\/span>/);

      const address = {
        extendedAddress: extendedAddressMatch ? extendedAddressMatch[1] : '',
        streetAddress: streetAddressMatch ? streetAddressMatch[1] : '',
        locality: localityMatch ? localityMatch[1] : '',
        region: regionMatch ? regionMatch[1] : '',
        postalCode: postalCodeMatch ? postalCodeMatch[1] : '',
        countryName: countryNameMatch ? countryNameMatch[1] : '',
      };

      const response = {
        address: address,
        location: {
          lat: data.result.geometry.location.lat,
          long: data.result.geometry.location.lng,
        },
      };
      return response;
    } catch (error) {
      console.error(error);
      throw new HttpException(ErrorEnum.ADDRESS_NOT_FOUND);
    }
  }
}

export const LocationService = new locationService();
