import { WebPlugin } from '@capacitor/core';
import type { ProximitySensorPlugin } from './definitions';

export class ProximitySensorWeb extends WebPlugin implements ProximitySensorPlugin {
	constructor() {
		super();
		// window.screen.orientation.addEventListener('change', () => {
		// 	const type = window.screen.orientation.type;
		// 	this.notifyListeners('screenOrientationChange', { type });
		// });
	}
	async startSensor(): Promise<void> {
		// throw new Error('Method not implemented.');
	}
	async stopSensor(): Promise<void> {
		// throw new Error('Method not implemented.');
	}
	async getLastDistance(): Promise<{ distance: number }> {
		// throw new Error('Method not implemented.');
		return { distance: 0 };
	}
}
