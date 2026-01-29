import React from 'react';
import { Station } from '@/types';

interface StationsListProps {
  stations: Station[];
  selectedStationId?: number;
  onStationSelect: (station: Station) => void;
}

export const StationsList: React.FC<StationsListProps> = ({
  stations,
  selectedStationId,
  onStationSelect,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold text-gray-800">Stations ({stations.length})</h3>
      <div className="space-y-1 max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-2 bg-gray-50">
        {stations.length > 0 ? (
          stations.map((station) => (
            <button
              key={station.id}
              onClick={() => onStationSelect(station)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                selectedStationId === station.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
              aria-current={selectedStationId === station.id}
            >
              <div className="font-medium">{station.name}</div>
              <div className="text-sm opacity-75">{station.city}</div>
            </button>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">No stations found</div>
        )}
      </div>
    </div>
  );
};
