<script>
	import { goto } from '$app/navigation';
	import { db } from '@services/db';
	import { nanoid } from 'nanoid';

	let count = 0;
	let showHint = true;

	$: if (count > 0) showHint = false;

	const increment = () => {
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
		const res = await db.logs.add({ id: nanoid(), count, timestamp: new Date(), goalMet: false });
		console.log(res);
	};
</script>

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

		<div class="flex justify-center gap-8 w-full mb-5">
			<button on:click={reset} class="btn btn-circle btn-lg" aria-label="Restart">
				<i class="fa-solid fa-rotate-right" />
			</button>
			<button on:click={decrement} class="btn btn-circle btn-lg" aria-label="Decrease">
				<i class="fa-solid fa-minus" />
			</button>
			<button class="btn btn-circle btn-lg" aria-label="Settings">
				<i class="fa-solid fa-gear" />
			</button>
		</div>
		<button on:click={endSession} class="btn btn-lg flex items-center rounded-4xl gap-4">
			<i class="fa-solid fa-stop" />
			<span>End session</span>
		</button>
	</div>
</div>
