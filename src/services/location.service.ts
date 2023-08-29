import { ErrorEnum } from '@/exceptions/errorCodes';
import { HttpException } from '@/exceptions/httpException';
import { GeolocationRemote } from '@/remote/location/geolocation.remote';

class locationService {
  public async getCoordinates(address?: string, placeId?: string) {
    try {
      const res = address
        ? await GeolocationRemote.getCoordinatesFromAddress(address)
        : placeId
        ? await GeolocationRemote.getCoordinatesFromPlaceID(placeId)
        : undefined;

      if (!res || res.results.length === 0) {
        throw new HttpException(ErrorEnum.ADDRESS_NOT_FOUND);
      }

      const pointCoordinates = res.results[0].geometry.location;
      return { long: pointCoordinates.lng, lat: pointCoordinates.lat };
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
}

export const LocationService = new locationService();
