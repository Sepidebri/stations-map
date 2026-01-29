import React from 'react';

interface CityFilterProps {
  cities: string[];
  selectedCity: string;
  onFilterChange: (city: string) => void;
}

export const CityFilter: React.FC<CityFilterProps> = ({ cities, selectedCity, onFilterChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="city-filter" className="text-sm font-semibold text-gray-700">
        Filter by City
      </label>
      <div className="flex gap-2">
        <input
          id="city-filter"
          type="text"
          placeholder="Search city..."
          value={selectedCity}
          onChange={(e) => onFilterChange(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          list="cities-list"
        />
        {selectedCity && (
          <button
            onClick={() => onFilterChange('')}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            aria-label="Clear filter"
          >
            Clear
          </button>
        )}
      </div>
      <datalist id="cities-list">
        {cities.map((city) => (
          <option key={city} value={city} />
        ))}
      </datalist>
    </div>
  );
};
