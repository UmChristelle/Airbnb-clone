import type { Listing } from '../types';
import { DEFAULT_PLACE_ID } from '../constants/places';

const fallbackImage =
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&auto=format&fit=crop&q=80';

const parisPlaceId = 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ';
const newYorkPlaceId = 'ChIJOwg_06VPwokRYv534QaPC8g';
const tokyoPlaceId = 'ChIJ51cu8IcbXWARiRtXIothAS4';
const londonPlaceId = 'ChIJdd4hrwug2EcRmSrV3Vo6llI';
const baliPlaceId = 'ChIJoQ8Q6NNB0S0RkOYkS7EPkSQ';

const mockListingsByPlaceId: Record<string, Listing[]> = {
  [parisPlaceId]: [
    {
      id: 'mock-paris-loft',
      name: 'Sunlit Loft Near the Seine',
      description:
        'A bright Paris loft with a balcony, fast WiFi, and easy access to museums, cafes, and metro connections.',
      price: 165,
      currency: 'USD',
      rating: 4.8,
      reviewCount: 124,
      images: [fallbackImage],
      location: 'Paris',
      city: 'Paris',
      country: 'France',
      bedrooms: 2,
      bathrooms: 1,
      maxGuests: 4,
      amenities: ['WiFi', 'Kitchen', 'Washer', 'City view'],
      host: {
        id: 'host-paris',
        name: 'Camille',
        avatar: 'https://i.pravatar.cc/150?img=32',
        isSuperhost: true,
      },
      coordinates: { lat: 48.8566, lng: 2.3522 },
    },
    {
      id: 'mock-paris-studio',
      name: 'Cozy Studio in Le Marais',
      description:
        'A compact and stylish stay in one of Paris most walkable neighborhoods, perfect for solo trips and couples.',
      price: 119,
      currency: 'USD',
      rating: 4.6,
      reviewCount: 88,
      images: [fallbackImage],
      location: 'Paris',
      city: 'Paris',
      country: 'France',
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
      amenities: ['WiFi', 'Kitchenette', 'Heating', 'Self check-in'],
      host: {
        id: 'host-paris-2',
        name: 'Amelie',
        avatar: 'https://i.pravatar.cc/150?img=47',
        isSuperhost: false,
      },
      coordinates: { lat: 48.8619, lng: 2.3623 },
    },
  ],
  [newYorkPlaceId]: [
    {
      id: 'mock-nyc-brownstone',
      name: 'Brooklyn Brownstone Retreat',
      description:
        'A spacious brownstone apartment with modern finishes, close to transit and neighborhood restaurants.',
      price: 210,
      currency: 'USD',
      rating: 4.7,
      reviewCount: 96,
      images: [fallbackImage],
      location: 'New York',
      city: 'New York',
      country: 'United States',
      bedrooms: 2,
      bathrooms: 2,
      maxGuests: 5,
      amenities: ['WiFi', 'Kitchen', 'Air conditioning', 'Workspace'],
      host: {
        id: 'host-nyc',
        name: 'Jordan',
        avatar: 'https://i.pravatar.cc/150?img=15',
        isSuperhost: true,
      },
      coordinates: { lat: 40.6782, lng: -73.9442 },
    },
  ],
  [tokyoPlaceId]: [
    {
      id: 'mock-tokyo-suite',
      name: 'Shibuya Skyline Suite',
      description:
        'A polished apartment near Shibuya crossing with calm interiors, city views, and smooth train access.',
      price: 178,
      currency: 'USD',
      rating: 4.9,
      reviewCount: 142,
      images: [fallbackImage],
      location: 'Tokyo',
      city: 'Tokyo',
      country: 'Japan',
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 3,
      amenities: ['WiFi', 'Elevator', 'Air conditioning', 'Washer'],
      host: {
        id: 'host-tokyo',
        name: 'Yuki',
        avatar: 'https://i.pravatar.cc/150?img=24',
        isSuperhost: true,
      },
      coordinates: { lat: 35.6762, lng: 139.6503 },
    },
  ],
  [londonPlaceId]: [
    {
      id: 'mock-london-flat',
      name: 'Elegant Flat in Notting Hill',
      description:
        'A refined London stay with a full kitchen, cozy lounge space, and quick connections to central attractions.',
      price: 194,
      currency: 'USD',
      rating: 4.7,
      reviewCount: 101,
      images: [fallbackImage],
      location: 'London',
      city: 'London',
      country: 'United Kingdom',
      bedrooms: 2,
      bathrooms: 1,
      maxGuests: 4,
      amenities: ['WiFi', 'Kitchen', 'Heating', 'Garden access'],
      host: {
        id: 'host-london',
        name: 'Aisha',
        avatar: 'https://i.pravatar.cc/150?img=20',
        isSuperhost: false,
      },
      coordinates: { lat: 51.5072, lng: -0.1276 },
    },
  ],
  [baliPlaceId]: [
    {
      id: 'mock-bali-villa',
      name: 'Private Villa with Jungle Pool',
      description:
        'A serene Bali villa with tropical landscaping, private pool, and indoor-outdoor living spaces.',
      price: 152,
      currency: 'USD',
      rating: 4.9,
      reviewCount: 167,
      images: [fallbackImage],
      location: 'Bali',
      city: 'Ubud',
      country: 'Indonesia',
      bedrooms: 2,
      bathrooms: 2,
      maxGuests: 4,
      amenities: ['WiFi', 'Pool', 'Breakfast', 'Air conditioning'],
      host: {
        id: 'host-bali',
        name: 'Made',
        avatar: 'https://i.pravatar.cc/150?img=12',
        isSuperhost: true,
      },
      coordinates: { lat: -8.5069, lng: 115.2625 },
    },
  ],
};

const defaultMockListings =
  mockListingsByPlaceId[DEFAULT_PLACE_ID] ?? Object.values(mockListingsByPlaceId)[0] ?? [];

export function getMockListingsByPlaceId(placeId?: string): Listing[] {
  return mockListingsByPlaceId[placeId ?? DEFAULT_PLACE_ID] ?? defaultMockListings;
}

export function getMockListingById(id: string): Listing | undefined {
  return Object.values(mockListingsByPlaceId)
    .flat()
    .find((listing) => listing.id === id);
}
