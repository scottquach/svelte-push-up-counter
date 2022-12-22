import Dexie, { type Table } from 'dexie';
import type { Log } from 'src/models/log.interface';

export const logDb = new (class LogDexie extends Dexie {
	logs!: Table<Log>;
	constructor() {
		super('primary');
		this.version(1).stores({
			logs: '++id, count, timestamp, goalMet'
		});
	}
})();

export const configDb = new (class ConfigDexie extends Dexie {
	config!: Table<{ id: string; value: any }>;
	constructor() {
		super('config');
		this.version(1).stores({
			config: '++id, value'
		});
	}
})();
