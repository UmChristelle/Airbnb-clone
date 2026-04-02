import { useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { fetchListingById } from '../services/listingsService';
import type { Listing } from '../types';

export function useListingDetails(id: string) {
  const queryClient = useQueryClient();

  const cachedListing = queryClient
    .getQueriesData<Listing[]>({ queryKey: ['listings'] })
    .flatMap(([, listings]) => listings ?? [])
    .find((listing) => listing.id === id);

  return useQuery({
    queryKey: ['listing', id],
    queryFn: () => fetchListingById(id),
    initialData: cachedListing,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    enabled: !!id && !cachedListing,
    retry: 2,
  });
}
