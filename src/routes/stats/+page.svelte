<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { logDb } from '@services/db';
	import { liveQuery } from 'dexie';

	const sum = (a: number, b: number) => a + b;

	$: totalCount = liveQuery(async () => {
		if (!browser) return 0;
		const logs = await logDb.logs.toArray();
		return logs.map((x) => x.count).reduce(sum, 0);
	}) as any;

	$: highestSession = liveQuery(async () => {
		if (!browser) return 0;
		const logs = await logDb.logs.orderBy('count').reverse().toArray();
		if (logs.length === 0) return 0;
		return logs[0].count;
	}) as any;

	$: lowestSession = liveQuery(async () => {
		if (!browser) return 0;
		const logs = await logDb.logs.orderBy('count').toArray();
		if (logs.length === 0) return 0;
		return logs[0].count;
	}) as any;

	const goHome = () => {
		goto('/');
	};
</script>

<div class="flex flex-col p-4 items-center">
	<div class="grid grid-cols-3 items-center w-full mb-2">
		<div class="self-start">
			<button class="btn btn-sm btn-circle btn-ghost" on:click={goHome}>
				<i class="fa-solid fa-chevron-left" />
			</button>
		</div>
		<div class="flex justify-center w-full">
			<div class="text-base font-medium opacity-75">Stats</div>
		</div>
	</div>
	<div class="flex justify-between gap-4 mt-5 w-full">
		<div class="flex flex-1 flex-col gap-2 rounded bg-gray-100 border border-solid p-5">
			<div class="text-2xl font-medium">Highest session</div>
			<div class="text-4xl font-bold">{ $highestSession }</div>
		</div>
		<div class="flex flex-1 flex-col gap-2 rounded bg-gray-100 border border-solid p-5">
			<div class="text-2xl font-medium">Lowest session</div>
			<div class="text-4xl font-bold">{ $lowestSession }</div>
		</div>
	</div>
	<div
		class="flex justify-between items-center w-full rounded bg-gray-100 border border-solid p-5 mt-4"
	>
		<div class="text-2xl font-medium">Total push-ups</div>
		<div class="text-4xl font-bold">{$totalCount}</div>
	</div>
</div>
