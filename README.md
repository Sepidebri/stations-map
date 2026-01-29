# 🚂 German Train Stations Map

Ever wanted to explore all the train stations across Germany? This app lets you do exactly that! Browse, filter, and discover train stations on an interactive map.

## What Does It Do?

This is a simple, clean React app that:

- **Shows stations on a map** — All German train stations displayed on an interactive Leaflet map
- **Lets you filter by city** — Looking for stations in Berlin? Munich? Just type and filter!
- **Click to explore** — Select any station to zoom in and see details
- **See the stats** — Quick overview of how many stations and cities match your search

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Installation

```bash
# Clone the repo and navigate to it
cd stations-map

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser. That's it! 🎉

### Other Commands

```bash
npm run build      # Build for production
npm run preview    # Preview the production build
npm test           # Run tests
npm run lint       # Check for linting issues
npm run type-check # TypeScript type checking
```

## Tech Stack

| Tool         | Purpose                   |
| ------------ | ------------------------- |
| React 18     | UI Framework              |
| TypeScript   | Type safety               |
| Vite         | Fast dev server & bundler |
| Tailwind CSS | Styling                   |
| Leaflet      | Interactive maps          |
| Axios        | API requests              |
| Vitest       | Testing                   |

## Project Structure

```
src/
├── components/          # UI components
│   ├── TrainStationsMap.tsx   # Main map view
│   ├── CityFilter.tsx         # Search/filter input
│   ├── StationsList.tsx       # List of stations
│   ├── Loading.tsx            # Loading spinner
│   └── Error.tsx              # Error message
├── hooks/               # Custom React hooks
│   ├── useStations.ts         # Fetches station data
│   └── useMap.ts              # Map controls
├── services/            # Business logic
│   └── stationService.tsx     # Filtering & data helpers
├── types/               # TypeScript types
│   └── index.ts
└── test/                # Test files
```

## How It Works

1. **Data Fetching** — When the app loads, it fetches station data from a public API
2. **Map Rendering** — Stations are displayed as markers on a Leaflet map centered on Germany
3. **Filtering** — Type in the city filter to narrow down stations
4. **Selection** — Click a station in the list or on the map to zoom in and see details

## Contributing

Feel free to open issues or submit PRs if you find bugs or have ideas for improvements!
