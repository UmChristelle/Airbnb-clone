export const POPULAR_DESTINATIONS = [
  { name: 'Paris', placeId: 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ' },
  { name: 'New York', placeId: 'ChIJOwg_06VPwokRYv534QaPC8g' },
  { name: 'Tokyo', placeId: 'ChIJ51cu8IcbXWARiRtXIothAS4' },
  { name: 'London', placeId: 'ChIJdd4hrwug2EcRmSrV3Vo6llI' },
  { name: 'Bali', placeId: 'ChIJoQ8Q6NNB0S0RkOYkS7EPkSQ' },
] as const;

export const DEFAULT_PLACE_ID = POPULAR_DESTINATIONS[0].placeId;

export const SEARCHABLE_PLACE_IDS = POPULAR_DESTINATIONS.map(
  (destination) => destination.placeId
);
