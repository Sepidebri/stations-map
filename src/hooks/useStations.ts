import { useEffect, useState } from 'react';
import { Station } from '@/types';
import { stationService } from '@/services/stationService';

interface UseStationsReturn {
  stations: Station[];
  loading: boolean;
  error: string | null;
}

export const useStations = (): UseStationsReturn => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await stationService.fetchStations();
        setStations(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(message);
        console.error('Error fetching stations:', message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { stations, loading, error };
};
