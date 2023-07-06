import { env } from '@/config';
import { HttpClient } from '../generic/httpClient';

const SUBSCRIPTION_KEY = env('SUBSCRIPTION_KEY');

export class GeolocationRemote {
  static async getCoordinates(address: string) {
    const response = await HttpClient.callApi({
      url: `https://atlas.microsoft.com/geocode?api-version=2022-09-01-preview&subscription-key=${SUBSCRIPTION_KEY}&addressLine=${address}`,
      method: 'GET',
    });
    return response;
  }

  static async getSuggestion(partialAddress: string) {
    const response = await HttpClient.callApi({
      url: `https://atlas.microsoft.com/search/address/suggestions/json?api-version=1.0&subscription-key=${SUBSCRIPTION_KEY}&query=${partialAddress}`,
      method: 'GET',
    });
    return response;
  }
}
