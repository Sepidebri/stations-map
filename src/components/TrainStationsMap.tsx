import React, { useEffect, useMemo, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Station } from '@/types';
import { useStations } from '@/hooks/useStations';
import { stationService } from '@/services/stationService';
import { CityFilter } from './CityFilter';
import { StationsList } from './StationsList';
import { Loading } from './Loading';
import { Error } from './Error';

const DEFAULT_CENTER: [number, number] = [51.1657, 10.4515]; 
const DEFAULT_ZOOM = 6;

export const TrainStationsMap: React.FC = () => {
  const { stations, loading, error } = useStations();
  const [selectedCity, setSelectedCity] = React.useState('');
  const [selectedStationId, setSelectedStationId] = React.useState<number>();

  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const uniqueCities = useMemo(() => stationService.getUniqueCities(stations), [stations]);

  const filteredStations = useMemo(
    () => stationService.filterStationsByCity(stations, selectedCity),
    [stations, selectedCity]
  );

  const filteredCities = useMemo(
    () => stationService.getUniqueCities(filteredStations),
    [filteredStations]
  );

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current).setView(DEFAULT_CENTER, DEFAULT_ZOOM);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    const bounds = L.latLngBounds([]);

    filteredStations.forEach((station) => {
      if (!mapRef.current) return;

      const isSelected = selectedStationId === station.id;

      const marker = L.marker([station.lat, station.lng], {
        icon: L.icon({
          iconUrl:
            'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/' +
            (isSelected ? 'img/marker-icon-2x-blue.png' : 'img/marker-icon-2x-red.png'),
          shadowUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
        title: station.name,
      })
        .bindPopup(`<strong>${station.name}</strong><br/>${station.city}`)
        .addTo(mapRef.current);

      markersRef.current.set(String(station.id), marker);
      bounds.extend([station.lat, station.lng]);
    });

    if (bounds.isValid() && filteredStations.length > 0) {
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [filteredStations, selectedStationId]);

  const handleStationSelect = (station: Station) => {
    setSelectedStationId(station.id);
    const marker = markersRef.current.get(String(station.id));
    if (marker && mapRef.current) {
      mapRef.current.setView([station.lat, station.lng], 13);
      marker.openPopup();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">🚂 German Train Stations</h1>
          <p className="text-gray-600 mt-1">Explore and filter train stations across Germany</p>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div ref={mapContainerRef} className="flex-1 z-0" />

        <div className="w-80 bg-white shadow-lg overflow-y-auto flex flex-col gap-6 p-6">
          {loading ? (
            <Loading />
          ) : error ? (
            <Error message={error} />
          ) : (
            <>
              <CityFilter
                cities={uniqueCities}
                selectedCity={selectedCity}
                onFilterChange={setSelectedCity}
              />

              <div className="border-t pt-4">
                <StationsList
                  stations={filteredStations}
                  selectedStationId={selectedStationId}
                  onStationSelect={handleStationSelect}
                />
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-primary-600">
                      {filteredStations.length}
                    </div>
                    <div className="text-xs text-gray-600">Stations</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-600">{filteredCities.length}</div>
                    <div className="text-xs text-gray-600">Cities</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
