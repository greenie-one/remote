import { env } from '@/config';
import { HttpClient } from '../generic/httpClient';

const SUBSCRIPTION_KEY = env('SUBSCRIPTION_KEY');

interface GetCoordinatesResponse {
  features: Array<Feature>;
}
interface Feature {
  geometry: {
    coordinates: Array<number>;
  };
}

export interface Location {
  latitude?: number
  longitude?: number
}

export class GeolocationRemote {
  static async getCoordinates(address: string): Promise<GetCoordinatesResponse> {
    const response: GetCoordinatesResponse = await HttpClient.callApi({
      url: `https://atlas.microsoft.com/geocode?api-version=2022-09-01-preview&subscription-key=${SUBSCRIPTION_KEY}&addressLine=${encodeURIComponent(address)}`,
      method: 'GET',
    });
    return response;
  }

  static async getSuggestion(partialAddress: string, locationBias: Location) {
    let url = `https://atlas.microsoft.com/search/fuzzy/json?api-version=1.0&subscription-key=${SUBSCRIPTION_KEY}&query=${encodeURIComponent(partialAddress)}&typeahead=true&countrySet=IN&limit=5&idxSet=PAD,POI,Str,Xstr,Geo`
    if (locationBias.latitude && locationBias.longitude) {
      url += `&lat=${locationBias.latitude}&lon=${locationBias.longitude}`
    }
    const response = await HttpClient.callApi({
      url,
      method: 'GET',
    });
    return response;
  }
}
