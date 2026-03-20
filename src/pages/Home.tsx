import { useMemo } from 'react';
import { useListings } from '../hooks/useListings';
import { useFilters } from '../context/FiltersContext';
import ListingCard from '../components/listings/ListingCard';
import FilterPanel from '../components/listings/FilterPanel';
import Loader from '../components/ui/Loader';
import ErrorState from '../components/ui/ErrorState';
import { MapPin, Landmark, Building2, Trees, Globe } from 'lucide-react';

const POPULAR_DESTINATIONS = [
  { name: 'Paris', placeId: 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ', icon: Landmark },
  { name: 'New York', placeId: 'ChIJOwg_06VPwokRYv534QaPC8g', icon: Building2 },
  { name: 'Tokyo', placeId: 'ChIJ51cu8IcbXWARiRtXIothAS4', icon: Globe },
  { name: 'London', placeId: 'ChIJdd4hrwug2EcRmSrV3Vo6llI', icon: Landmark },
  { name: 'Bali', placeId: 'ChIJoQ8Q6NNB0S0RkOYkS7EPkSQ', icon: Trees },
];

export default function Home() {
  const { filters, setFilters } = useFilters();
  const activePlaceId = filters.location || 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ';
  const { data: listings, isLoading, isError, error, refetch } = useListings(activePlaceId);

  const filtered = useMemo(() => {
    if (!listings) return [];
    return listings.filter((l) => {
      const matchesPrice = l.price >= filters.minPrice && l.price <= filters.maxPrice;
      const matchesRating = l.rating >= filters.minRating;
      const matchesSearch =
        !filters.searchQuery ||
        l.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        l.city.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        l.country.toLowerCase().includes(filters.searchQuery.toLowerCase());
      return matchesPrice && matchesRating && matchesSearch;
    });
  }, [listings, filters]);

  return (
    <div>
      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden mb-8 bg-gradient-to-br from-rose-500 via-rose-400 to-orange-300 px-8 py-16 text-white">
        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl font-bold mb-3 leading-tight">
            Find your perfect stay
          </h1>
          <p className="text-rose-100 text-lg">
            Discover unique homes and experiences around the world
          </p>
        </div>
        <div className="absolute right-8 bottom-0 opacity-10">
          <Building2 className="w-48 h-48 text-white" />
        </div>
      </div>

      {/* Destinations */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-rose-500" />
          Popular destinations
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {POPULAR_DESTINATIONS.map((dest) => {
            const Icon = dest.icon;
            return (
              <button
                key={dest.placeId}
                onClick={() => setFilters({ location: dest.placeId })}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium whitespace-nowrap transition-all ${
                  activePlaceId === dest.placeId
                    ? 'bg-rose-500 text-white border-rose-500 shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-rose-300 hover:text-rose-500'
                }`}
              >
                <Icon className="w-4 h-4" />
                {dest.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-72 shrink-0">
          <FilterPanel />
        </aside>
        <div className="flex-1">
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <ErrorState
              message={(error as Error)?.message}
              onRetry={() => refetch()}
            />
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-rose-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No listings found</h3>
              <p className="text-gray-400 text-sm">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">
                {filtered.length} stay{filtered.length !== 1 ? 's' : ''} found
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}