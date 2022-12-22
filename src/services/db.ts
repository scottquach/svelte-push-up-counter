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

// let db: IDBDatabase | null = null;
// const DBOpenReq = indexedDB.open('primary', 1);

// // const init = async () => {
// // 	return new Promise((resolve, reject) => {
// DBOpenReq.onerror = (e) => {
// 	console.log('Error opening database', e);
// 	// reject(e);
// };

// DBOpenReq.onsuccess = (e: any) => {
// 	console.log('Database opened successfully');
// 	db = e.target.result;
// 	// resolve(e.target.result);
// };

// DBOpenReq.onupgradeneeded = (e: any) => {};
// // 	});
// // };
// // await init();

// export const addLog = (log: Log) => {
// }

// export default db;
