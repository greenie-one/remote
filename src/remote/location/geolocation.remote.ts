import { env } from '@/config';
import { HttpClient } from '../generic/httpClient';

const SUBSCRIPTION_KEY = env('PLACES_KEY');

export type AddressComponents = Array<{
  long_name: string;
  short_name: string;
  types: Array<string>;
}>;

interface GetCoordinatesResponse {
  results: Array<{
    address_components: AddressComponents;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    formatted_address: string;
  }>;
}

interface Suggestion {
  predictions: Array<{
    description: string;
    place_id: string;
  }>;
}

export class GeolocationRemote {
  static async getCoordinatesFromAddress(address: string): Promise<GetCoordinatesResponse> {
    const response: GetCoordinatesResponse = await HttpClient.callApi({
      url: `https://maps.googleapis.com/maps/api/geocode/json?key=${SUBSCRIPTION_KEY}&address=${address}`,
      method: 'GET',
    });
    return response;
  }

  static async getCoordinatesFromPlaceID(place_id: string): Promise<GetCoordinatesResponse> {
    const response: GetCoordinatesResponse = await HttpClient.callApi({
      url: `https://maps.googleapis.com/maps/api/geocode/json?key=${SUBSCRIPTION_KEY}&place_id=${place_id}`,
      method: 'GET',
    });
    return response;
  }

  static async getSuggestion(partialAddress: string) {
    const offset = partialAddress.length - 1;

    const url =
      offset > 3
        ? `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${partialAddress}&offset=${offset}&key=${SUBSCRIPTION_KEY}`
        : `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${partialAddress}&key=${SUBSCRIPTION_KEY}`;
    const response: Suggestion = await HttpClient.callApi({
      url,
      method: 'GET',
    });
    return response;
  }
}
