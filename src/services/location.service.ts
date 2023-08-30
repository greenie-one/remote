import { ErrorEnum } from '@/exceptions/errorCodes';
import { HttpException } from '@/exceptions/httpException';
import { AddressComponents, GeolocationRemote } from '@/remote/location/geolocation.remote';

class locationService {
  convertToNormalizedAddress(address_components: AddressComponents) {
    const normalizedAddress = {
      address_line_1: '',
      address_line_2: '',
      landmark: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
    };

    for (const component of address_components) {
      const types = component.types;

      if (types.includes('street_number') || types.includes('neighborhood')) {
        normalizedAddress.address_line_1
          ? (normalizedAddress.address_line_1 += ' ' + component.long_name)
          : (normalizedAddress.address_line_1 = component.long_name);
      } else if (types.includes('route') || types.includes('sublocality') || types.includes('sublocality_level_1')) {
        normalizedAddress.address_line_2
          ? (normalizedAddress.address_line_2 += ' ' + component.long_name)
          : (normalizedAddress.address_line_2 = component.long_name);
      } else if (types.includes('premise') || types.includes('point_of_interest') || types.includes('establishment') || types.includes('landmark')) {
        normalizedAddress.landmark = component.long_name;
      } else if (types.includes('locality')) {
        normalizedAddress.city = component.long_name;
      } else if (types.includes('administrative_area_level_1')) {
        normalizedAddress.state = component.long_name;
      } else if (types.includes('country')) {
        normalizedAddress.country = component.long_name;
      } else if (types.includes('postal_code')) {
        normalizedAddress.pincode = component.long_name;
      }
    }

    return normalizedAddress;
  }

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
      return {
        long: pointCoordinates.lng,
        lat: pointCoordinates.lat,
        address: this.convertToNormalizedAddress(res.results[0].address_components),
        formattedAddress: res.results[0].formatted_address,
      };
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
