import api from './api';
import { transformListings } from '../utils/transformers';
import type { Listing } from '../types';
import { DEFAULT_PLACE_ID, SEARCHABLE_PLACE_IDS } from '../constants/places';
import { getMockListingById, getMockListingsByPlaceId } from '../mocks/listings';

const SEARCH_ENDPOINT = '/api/v2/searchPropertyByPlaceId';

async function fetchListingsFromApi(placeId: string): Promise<Listing[]> {
  const { data } = await api.get(SEARCH_ENDPOINT, {
    params: {
      placeId,
      totalRecords: 12,
      currency: 'USD',
      adults: '2',
    },
  });

  const listings = transformListings(data);
  if (listings.length === 0) {
    throw new Error('No listings were returned by the API.');
  }

  return listings;
}

export async function fetchListings(
  placeId: string = DEFAULT_PLACE_ID
): Promise<Listing[]> {
  try {
    return await fetchListingsFromApi(placeId);
  } catch (error) {
    console.warn('Falling back to mock listings because the API request failed.', error);
    return getMockListingsByPlaceId(placeId);
  }
}

export async function fetchListingById(id: string): Promise<Listing> {
  for (const placeId of SEARCHABLE_PLACE_IDS) {
    try {
      const listings = await fetchListingsFromApi(placeId);
      const listing = listings.find((item) => item.id === id);
      if (listing) return listing;
    } catch {
      const mockListing = getMockListingById(id);
      if (mockListing) return mockListing;
    }
  }

  const fallbackListing = getMockListingById(id);
  if (fallbackListing) return fallbackListing;

  throw new Error('Listing not found.');
}
