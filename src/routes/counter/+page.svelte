<script lang="ts">
	import { goto } from '$app/navigation';
	import audio from '@services/audio';
	import { logDb } from '@services/db';
	import { nanoid } from 'nanoid';
	import { onDestroy, onMount } from 'svelte';
	import { ProximitySensor } from '../../plugins/proximity-sensor';
	import Settings from './settings.svelte';

	let count = 0;
	let showHint = true;
	let playBeep = true;
	let showPushUpDetection = false;

	let baselineLight: number | null;
	let currentLight: number | null;
	let active = false;

	const lightThreshold = .7;

	$: lightProgress = (() => {
		if (baselineLight && currentLight) {
			if (currentLight > baselineLight) return 0;
			const maxProgress = baselineLight - baselineLight * lightThreshold;
			const currentProgress = baselineLight - currentLight;
			return Math.floor((currentProgress / maxProgress) * 100);
		}
		return 0;
	})();

	$: {
		if (!active && currentLight! < baselineLight! * lightThreshold) {
			active = true;
			increment();
		}
		if (active && currentLight! > baselineLight! * lightThreshold) {
			active = false;
		}
	}

	$: if (count > 0) showHint = false;

	const increment = () => {
		if (playBeep) audio.playBeep();
		ProximitySensor.getLastDistance();
		count += 1;
	};
	const decrement = () => {
		if (count > 0) count -= 1;
	};

	const reset = () => {
		count = 0;
	};

	const goHome = () => {
		goto('/', { replaceState: true });
	};

	const endSession = async () => {
		const res = await logDb.logs.add({
			id: nanoid(),
			count,
			timestamp: new Date(),
			goalMet: false
		});
		goto('/logs', { replaceState: true });
		console.log(res);
	};

	onMount(() => {
		ProximitySensor.startSensor();
		ProximitySensor.addListener('proximitySensorChange', (e) => {
			console.log(JSON.stringify(e));
			if (!baselineLight) baselineLight = e.distance;
			currentLight = e.distance;
		});
	});

	onDestroy(() => {
		ProximitySensor.stopSensor();
	});
</script>

<!-- <div>{baselineLight}</div>
<div>{currentLight}</div>
<div>{active}</div>
<div>{lightProgress}</div> -->
<div class="flex flex-col w-full h-full items-center justify-center p-4">
	<div class="grid grid-cols-3 items-center w-full mb-2">
		<div class="self-start">
			<button class="btn btn-sm btn-circle btn-ghost" on:click={goHome}>
				<i class="fa-solid fa-chevron-left" />
			</button>
		</div>
		<div class="flex justify-center w-full">
			<div class="text-base font-medium opacity-75">Push-Ups</div>
		</div>
	</div>
	{#if showPushUpDetection && baselineLight && currentLight}
		<progress class="progress w-full transition-all duration-75 m-2 mt-4" value={lightProgress} max="100" />
		<div class="w-full text-right text-sm opacity-75 font-bold">Push-up detection</div>
	{/if}

	<div
		class="flex items-center justify-center w-full mb-auto h-[32rem]"
		on:click={increment}
		role="presentation"
	>
		<div class="text-9xl">{count}</div>
	</div>

	<div class="flex flex-col items-center w-full mt-auto rounded-md p-4">
		{#if showHint}
			<div
				class="flex items-center h-min p-3 gap-2 rounded-md bg-gray-100 mb-4 border border-solid"
			>
				<div class="text-sm opacity-80 text-left">
					Place phone face up under face to use proximity sensor or tap screen to increment
				</div>
				<button on:click={() => (showHint = false)} class="btn btn-circle btn-outline btn-sm">
					<i class="fa-solid fa-xmark" />
				</button>
			</div>
		{/if}

		<div class="flex justify-center gap-8 w-full mb-6">
			<button on:click={reset} class="btn btn-circle btn-lg bg-blue-400" aria-label="Restart">
				<i class="fa-solid fa-rotate-right" />
			</button>
			<button on:click={decrement} class="btn btn-circle btn-lg bg-blue-400" aria-label="Decrease">
				<i class="fa-solid fa-minus" />
			</button>
			<Settings bind:playBeep bind:pushUpDetection={showPushUpDetection} />
		</div>
		<button on:click={endSession} class="btn btn-lg flex items-center rounded-4xl gap-4 bg-red-400">
			<i class="fa-solid fa-stop" />
			<span>End session</span>
		</button>
	</div>
</div>
