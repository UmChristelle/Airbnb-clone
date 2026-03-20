/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Listing } from '../types';

export function transformListing(raw: any): Listing {
  return {
    id: raw?.id ?? raw?.listing?.id ?? String(Math.random()),
    name: raw?.name ?? raw?.listing?.name ?? 'Beautiful Property',
    description: raw?.description ?? raw?.listing?.description ?? 'A wonderful place to stay.',
    price: raw?.price?.rate ?? raw?.pricing?.rate?.amount ?? Math.floor(Math.random() * 200) + 50,
    currency: raw?.price?.currency ?? 'USD',
    rating: raw?.avgRating ?? raw?.star_rating ?? 4.5,
    reviewCount: raw?.reviewsCount ?? raw?.reviews_count ?? 0,
    images: raw?.images?.map((img: any) => img?.url ?? img) ??
      raw?.picture_urls ?? [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      ],
    location: raw?.address ?? raw?.listing?.publicAddress ?? 'Location not specified',
    city: raw?.city ?? raw?.listing?.city ?? 'Unknown City',
    country: raw?.country ?? raw?.listing?.country ?? 'Unknown Country',
    bedrooms: raw?.bedrooms ?? raw?.listing?.bedrooms ?? 1,
    bathrooms: raw?.bathrooms ?? raw?.listing?.bathrooms ?? 1,
    maxGuests: raw?.personCapacity ?? raw?.listing?.person_capacity ?? 2,
    amenities: raw?.amenities?.map((a: any) => a?.name ?? a) ?? [],
    host: {
      id: raw?.host?.id ?? '1',
      name: raw?.host?.name ?? 'Your Host',
      avatar: raw?.host?.thumbnail ?? 'https://i.pravatar.cc/150',
      isSuperhost: raw?.host?.isSuperHost ?? false,
    },
    coordinates: {
      lat: raw?.lat ?? raw?.listing?.lat ?? 0,
      lng: raw?.lng ?? raw?.listing?.lng ?? 0,
    },
  };
}

export function transformListings(data: any): Listing[] {
  const results =
    data?.results ??
    data?.data?.results ??
    data?.data ??
    data?.list ??
    [];
  if (!Array.isArray(results)) return [];
  return results.map(transformListing);
}
