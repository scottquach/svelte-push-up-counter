import { browser } from '$app/environment';
import { db } from '@services/db';
import { liveQuery } from 'dexie';
import { readable, writable } from 'svelte/store';
import type { Log } from './models/log.interface';

export const count = writable(0);

export const logs = readable<Log[]>([], function start(set) {
	let logs = liveQuery(() => (browser ? db.logs.orderBy('timestamp').reverse().toArray() : []));
	logs.subscribe((logs) => {
		set(logs);
	});
});
