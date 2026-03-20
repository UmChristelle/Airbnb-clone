/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './api';
import { transformListings } from '../utils/transformers';
import type { Listing } from '../types';

export async function fetchListings(placeId: string = 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ'): Promise<Listing[]> {
  const { data } = await api.get('/api/v2/searchPropertyByPlaceId', {
    params: { placeId },
  });
  return transformListings(data);
}

export async function fetchListingById(id: string): Promise<Listing> {
  const { data } = await api.get('/api/v2/searchPropertyByPlaceId', {
    params: { placeId: id },
  });
  const listings = transformListings(data);
  if (listings.length === 0) throw new Error('Listing not found');
  return listings[0];
}
