import { useQuery } from '@tanstack/react-query';
import { fetchListings } from '../services/listingsService';

export function useListings(placeId?: string) {
  return useQuery({
    queryKey: ['listings', placeId ?? 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ'],
    queryFn: () => fetchListings(placeId),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}