/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Listing } from '../types';

export function transformListing(raw: any): Listing {
  const listing = raw?.listing ?? raw;
  const pictures = raw?.contextualPictures ?? [];
  const priceString = raw?.structuredDisplayPrice?.primaryLine?.discountedPrice
    ?? raw?.structuredDisplayPrice?.primaryLine?.price
    ?? '$100';
  const priceNumber = parseFloat(priceString.replace(/[^0-9.]/g, '')) || 100;
  const nights = 5;
  const perNight = Math.round(priceNumber / nights);
  const ratingLocalized = raw?.avgRatingLocalized ?? '4.5';
  const ratingMatch = ratingLocalized.match(/[\d.]+/);
  const rating = ratingMatch ? parseFloat(ratingMatch[0]) : 4.5;
  const reviewMatch = raw?.avgRatingA11yLabel?.match(/(\d+)\s+review/);
  const reviewCount = reviewMatch ? parseInt(reviewMatch[1]) : 0;
  const isSuperhost = raw?.badges?.some(
    (b: any) => b?.loggingContext?.badgeType === 'SUPERHOST'
  ) ?? listing?.primaryHostPassport?.isSuperhost ?? false;

  return {
    id: listing?.id ?? String(Math.random()),
    name: raw?.title ?? listing?.legacyName ?? 'Beautiful Property',
    description: `${raw?.title ?? 'Beautiful property'} located in ${listing?.legacyLocalizedCityName ?? 'Paris'}. A wonderful place to stay with great amenities and a perfect location.`,
    price: perNight,
    currency: 'USD',
    rating: rating,
    reviewCount: reviewCount,
    images: pictures.map((p: any) => p?.picture).filter(Boolean),
    location: listing?.legacyLocalizedCityName ?? 'Paris',
    city: raw?.demandStayListing?.location?.city ?? listing?.legacyCity ?? 'Paris',
    country: 'France',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: ['WiFi', 'Kitchen', 'Air conditioning', 'Heating'],
    host: {
      id: listing?.primaryHostPassport?.userId ?? '1',
      name: listing?.primaryHostPassport?.name ?? 'Your Host',
      avatar: listing?.primaryHostPassport?.thumbnailUrl ?? 'https://i.pravatar.cc/150',
      isSuperhost: isSuperhost,
    },
    coordinates: {
      lat: listing?.legacyCoordinate?.latitude ?? 48.8566,
      lng: listing?.legacyCoordinate?.longitude ?? 2.3522,
    },
  };
}

export function transformListings(data: any): Listing[] {
  const list = data?.data?.list ?? data?.list ?? data?.results ?? [];
  if (!Array.isArray(list)) return [];
  return list.map(transformListing);
}