<script lang="ts">
	import { browser } from "$app/environment";
	import { goto } from '$app/navigation';
	import { logDb } from "@services/db";
	import { liveQuery } from "dexie";
	import LogItem from './log-item.svelte';

	let sort = 'Date'
	$: logs = liveQuery(() => (browser ? logDb.logs.orderBy(sort == 'Date' ? 'timestamp' : 'count').reverse().toArray() : [])) as any;

	const goHome = () => {
		goto('/', { replaceState: true });
	};
</script>

<div class="flex flex-col w-full h-full items-center justify-start p-4">
	<div class="grid grid-cols-3 items-center w-full mb-2">
		<div class="self-start">
			<button class="btn btn-sm btn-circle btn-ghost" on:click={goHome}>
				<i class="fa-solid fa-chevron-left" />
			</button>
		</div>
		<div class="flex justify-center w-full">
			<div class="text-base font-medium opacity-75">Logs</div>
		</div>
	</div>
	<select class="select max-w-xs ml-auto" bind:value={sort}>
		<option disabled selected>Sort by</option>
		<option>Date</option>
		<option>Count</option>
	</select>
	{#if $logs}
		<div class="overflow-x-auto w-full mt-5">
			<table class="table table-zebra w-full">
				<thead>
					<tr>
						<th>Date</th>
						<th>Count</th>
					</tr>
				</thead>
				<tbody>
					{#each $logs as log}
						<LogItem {log} />
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
