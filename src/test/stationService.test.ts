import { stationService } from '../services/stationService';
import { Station } from '../types';

describe('stationService', () => {
  const mockStations: Station[] = [
    { id: 1, name: 'Berlin Hbf', city: 'Berlin', lat: 52.5251, lng: 13.3694 },
    { id: 2, name: 'Munich Hbf', city: 'Munich', lat: 48.1403, lng: 11.5601 },
    { id: 3, name: 'Frankfurt Hbf', city: 'Frankfurt', lat: 50.107, lng: 8.6636 },
    { id: 4, name: 'Berlin Ostbahnhof', city: 'Berlin', lat: 52.5106, lng: 13.4347 },
  ];

  describe('filterStationsByCity', () => {
    it('should return all stations when city filter is empty', () => {
      const result = stationService.filterStationsByCity(mockStations, '');
      expect(result).toHaveLength(4);
    });

    it('should return all stations when city filter is whitespace', () => {
      const result = stationService.filterStationsByCity(mockStations, '   ');
      expect(result).toHaveLength(4);
    });

    it('should filter stations by city name (case insensitive)', () => {
      const result = stationService.filterStationsByCity(mockStations, 'berlin');
      expect(result).toHaveLength(2);
      expect(result.every((s) => s.city === 'Berlin')).toBe(true);
    });

    it('should filter stations by partial city name', () => {
      const result = stationService.filterStationsByCity(mockStations, 'mun');
      expect(result).toHaveLength(1);
      expect(result[0].city).toBe('Munich');
    });

    it('should return empty array when no match', () => {
      const result = stationService.filterStationsByCity(mockStations, 'Hamburg');
      expect(result).toHaveLength(0);
    });
  });

  describe('getUniqueCities', () => {
    it('should return unique cities sorted alphabetically', () => {
      const result = stationService.getUniqueCities(mockStations);
      expect(result).toEqual(['Berlin', 'Frankfurt', 'Munich']);
    });

    it('should return empty array for empty stations', () => {
      const result = stationService.getUniqueCities([]);
      expect(result).toEqual([]);
    });
  });

  describe('getStationById', () => {
    it('should return station when found', () => {
      const result = stationService.getStationById(mockStations, 1);
      expect(result).toEqual(mockStations[0]);
    });

    it('should return undefined when not found', () => {
      const result = stationService.getStationById(mockStations, 999);
      expect(result).toBeUndefined();
    });
  });
});
