import { registerPlugin } from '@capacitor/core';

import type { ProximitySensorPlugin } from './definitions';

const ProximitySensor = registerPlugin<ProximitySensorPlugin>(
  'ProximitySensor',
);

export * from './definitions';
export { ProximitySensor};