import { browser } from '$app/environment';
import { configDb, logDb } from '@services/db';
import { liveQuery } from 'dexie';
import { readable, writable } from 'svelte/store';
import type { Log } from './models/log.interface';


export const logs = readable<Log[]>([], function start(set) {
	let logs = liveQuery(() => (browser ? logDb.logs.orderBy('timestamp').reverse().toArray() : []));
	logs.subscribe((logs) => {
		set(logs);
	});
});

export const dailyGoal = readable<number>(0, function start(set) {
	let config = liveQuery(() =>
		browser ? configDb.config.where('id').equals('dailyGoal').toArray() : []
	);
	config.subscribe((config) => {
		if (config.length > 0) {
			set(config[0].value);
		} else {
			set(0);
		}
	});
});
