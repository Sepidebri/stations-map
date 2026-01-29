import { useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import { Station } from '@/types';
import 'leaflet/dist/leaflet.css';

const DEFAULT_CENTER: [number, number] = [51.1657, 10.4515]; 
const DEFAULT_ZOOM = 6;

interface UseMapReturn {
  mapContainerId: string;
  zoomToStation: (station: Station) => void;
  addMarkers: (stations: Station[], selectedId?: number) => void;
  clearMarkers: () => void;
}

export const useMap = (): UseMapReturn => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const mapContainerId = 'map-container';

  useEffect(() => {
    const map = L.map(mapContainerId).setView(DEFAULT_CENTER, DEFAULT_ZOOM);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, []);

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker: L.Marker) => {
      marker.remove();
    });
    markersRef.current.clear();
  }, []);

  const addMarkers = useCallback(
    (stations: Station[], selectedId?: number) => {
      clearMarkers();

      if (!mapRef.current) return;

      const bounds = L.latLngBounds([]);

      stations.forEach((station) => {
        if (!mapRef.current) return;

        const isSelected = selectedId === station.id;

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

      if (bounds.isValid()) {
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      }
    },
    [clearMarkers]
  );

  const zoomToStation = useCallback((station: Station) => {
    const marker = markersRef.current.get(String(station.id));
    if (marker && mapRef.current) {
      mapRef.current.setView([station.lat, station.lng], 13);
      marker.openPopup();
    }
  }, []);

  return {
    mapContainerId,
    zoomToStation,
    addMarkers,
    clearMarkers,
  };
};
