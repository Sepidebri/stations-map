import axios from 'axios';
import { StationsResponse, Station } from '@/types';

const API_URL = 'https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw';

const axiosInstance = axios.create({
  timeout: 10000,
});

export const stationService = {
  async fetchStations(): Promise<Station[]> {
    try {
      const response = await axiosInstance.get<StationsResponse>(API_URL);
      return response.data || [];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to fetch stations: ${error.message}`);
      }
      throw error;
    }
  },

  filterStationsByCity(stations: Station[], city: string): Station[] {
    if (!city.trim()) return stations;
    return stations.filter((station) => station.city.toLowerCase().includes(city.toLowerCase()));
  },

  getUniqueCities(stations: Station[]): string[] {
    const cities = [...new Set(stations.map((s) => s.city))];
    return cities.sort((a, b) => a.localeCompare(b));
  },

  getStationById(stations: Station[], id: number): Station | undefined {
    return stations.find((s) => s.id === id);
  },
};
