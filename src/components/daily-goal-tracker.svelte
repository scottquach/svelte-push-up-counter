<script>
	import { configDb } from '@services/db';
	import { dailyGoal, dailyProgress } from '../store';

	$: progressWidth = $dailyProgress <= $dailyGoal ? `${($dailyProgress / $dailyGoal) * 100}%` : '100%';


	let setGoal = 100;
	const onSetGoal = async () => {
		if (isNaN(setGoal)) return;
		await configDb.config.put({
			id: 'dailyGoal',
			value: setGoal
		});
	};
</script>

<label
	class="relative flex flex-col justify-between rounded-md border border-solid bg-gray-100 w-full"
	for="my-modal"
>
	<div class="absolute rounded h-full bg-green-300 " style="width: {progressWidth}" />
	<div class="p-3 z-10">
		<div class="flex justify-between">
			<div class="text-3xl font-bold mb0">Daily goal</div>
			<i class="fa-solid fa-bullseye text-2xl" />
		</div>
		<div class="flex justify-between">
			<div><span class="font-bold text-2xl">{$dailyProgress}</span> push-ups</div>
			<div><span class="font-bold text-2xl">{$dailyGoal}</span> target</div>
		</div>
	</div>
</label>

<input type="checkbox" id="my-modal" class="modal-toggle" />
<label for="my-modal" class="modal cursor-pointer modal-bottom sm:modal-middle">
	<label class="modal-box relative" for="">
		<h3 class="font-bold text-xl">Set a daily goal</h3>

		<p class="py-4">All push-up sessions for a day will be measured against what you set</p>
		<input
			bind:value={setGoal}
			type="number"
			placeholder="Enter here"
			class="input input-bordered w-full max-w-xs mb-10"
		/>

		<div class="modal-action">
			<label for="my-modal" class="btn btn-outline">Cancel</label>
			<label for="my-modal" class="btn" on:click={onSetGoal} role="presentation">Set goal</label>
		</div>
	</label>
</label>
