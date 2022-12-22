import { browser } from '$app/environment';
import { configDb, logDb } from '@services/db';
import { liveQuery } from 'dexie';
import { readable, writable } from 'svelte/store';
import { set as dateSet } from 'date-fns';
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

export const dailyProgress = readable<number>(0, function start(set) {
	const currentTime = new Date();
	const todayEnd = dateSet(currentTime, { hours: 23, minutes: 59, seconds: 59, milliseconds: 999 });
	const todayStart = dateSet(currentTime, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
	console.log(todayStart, todayEnd);

	let todaysSessions = liveQuery(() =>
		browser ? logDb.logs.where('timestamp').between(todayStart, todayEnd).toArray() : []
	);

	todaysSessions.subscribe((todaysSessions) => {
		console.log('sessions', todaysSessions);
		if (todaysSessions.length > 0) {
			set(todaysSessions.reduce((acc, session) => acc + session.count, 0));
		}
	});
});
