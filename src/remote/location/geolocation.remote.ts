import { env } from '@/config';
import { HttpClient } from '../generic/httpClient';

const SUBSCRIPTION_KEY = env('PLACES_KEY');

interface GetCoordinatesResponse {
  features: Array<Feature>;
}

interface Feature {
  geometry: {
    coordinates: Array<number>;
  };
}

export interface Location {
  latitude?: number;
  longitude?: number;
}

export class GeolocationRemote {
  static async getCoordinates(address: string): Promise<GetCoordinatesResponse> {
    const response: GetCoordinatesResponse = await HttpClient.callApi({
      url: `https://maps.googleapis.com/maps/api/geocode/json?key=${SUBSCRIPTION_KEY}&address=${address}`,
      method: 'GET',
    });
    return response;
  }

  static async getSuggestion(partialAddress: string) {
    const offset = partialAddress.length - 1;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${partialAddress}&offset=${offset}&key=${SUBSCRIPTION_KEY}`;
    const response = await HttpClient.callApi({
      url,
      method: 'GET',
    });
    return response;
  }

  static async getPlaceDetails(placeId: string) {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${SUBSCRIPTION_KEY}&place_id=${placeId}`;
    const response = await HttpClient.callApi({
      url,
      method: 'GET',
    });
    return response;
  }
}
