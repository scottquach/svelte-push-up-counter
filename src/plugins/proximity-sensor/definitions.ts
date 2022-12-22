import type { PluginListenerHandle } from '@capacitor/core';

export interface ProximitySensorPlugin {
	startSensor(): Promise<void>;
	stopSensor(): Promise<void>;

	getLastDistance(): Promise<{
		distance: number;
	}>;

	addListener(
		eventName: 'proximitySensorChange',
		listenerFunc: (change: { distance: number }) => void
	): Promise<PluginListenerHandle> & PluginListenerHandle;
}
