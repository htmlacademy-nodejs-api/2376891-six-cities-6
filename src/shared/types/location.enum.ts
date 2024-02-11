import { ECityName } from './index.js';

export const ELocation = {
  [ECityName.Paris]: { latitude: 48.85661, longitude: 2.351499 },
  [ECityName.Cologne]: { latitude: 50.938361, longitude: 6.959974 },
  [ECityName.Brussels]: { latitude: 50.846557, longitude: 4.351697 },
  [ECityName.Amsterdam]: { latitude: 52.370216, longitude: 4.895168 },
  [ECityName.Hamburg]: { latitude: 53.550341, longitude: 10.000654 },
  [ECityName.Dusseldorf]: { latitude: 51.225402, longitude: 6.776314 },
} as const;
