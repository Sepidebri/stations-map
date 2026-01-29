export interface Station {
  id: number;
  name: string;
  city: string;
  lat: number;
  lng: number;
  category?: string;
}

// API returns an array directly, not wrapped in an object
export type StationsResponse = Station[];

export interface FilterState {
  searchCity: string;
  selectedStationId?: string;
}
