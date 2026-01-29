import { vi } from 'vitest';

// Mock leaflet to prevent module errors in tests
vi.mock('leaflet', () => ({
  default: {
    map: vi.fn(),
    tileLayer: vi.fn(),
    marker: vi.fn(),
    icon: vi.fn(),
    divIcon: vi.fn(),
  },
}));
