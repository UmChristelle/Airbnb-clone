import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { FilterState } from '../types';

const defaultFilters: FilterState = {
  minPrice: 0,
  maxPrice: 10000,
  minRating: 0,
  location: 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ',
  searchQuery: '',
};

interface FiltersContextType {
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFiltersState] = useState<FilterState>(() => {
    try {
      const stored = localStorage.getItem('stayfinder_filters');
      return stored ? { ...defaultFilters, ...JSON.parse(stored) } : defaultFilters;
    } catch {
      return defaultFilters;
    }
  });

  const setFilters = (newFilters: Partial<FilterState>) => {
    setFiltersState((prev) => {
      const updated = { ...prev, ...newFilters };
      localStorage.setItem('stayfinder_filters', JSON.stringify(updated));
      return updated;
    });
  };

  const resetFilters = () => {
    localStorage.removeItem('stayfinder_filters');
    setFiltersState(defaultFilters);
  };

  return (
    <FiltersContext.Provider value={{ filters, setFilters, resetFilters }}>
      {children}
    </FiltersContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FiltersContext);
  if (!context) throw new Error('useFilters must be used within FiltersProvider');
  return context;
}