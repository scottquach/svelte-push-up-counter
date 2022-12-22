import Dexie, { type Table } from 'dexie';
import type { Log } from 'src/models/log.interface';

export const db = new (class LogDexie extends Dexie {
	logs!: Table<Log>;
	constructor() {
		super('primary');
		this.version(1).stores({
			logs: '++id, count, timestamp, goalMet'
		});
	}
})();

