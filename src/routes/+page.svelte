<script>
	export const prerender = true;
	import DailyGoalTracker from '@components/daily-goal-tracker.svelte';
	import HomeAction from '@components/home-action.svelte';
</script>

<div class="flex flex-col h-full w-full p-5">
	<div class="font-bold text-3xl mb-5">Good, Evening</div>

	<DailyGoalTracker />

	<div class="flex flex-col gap-5 mt-auto p-5">
		<a href="/counter">
			<HomeAction preface="Start" action="Push-ups" />
		</a>
		<a href="stats">
			<HomeAction preface="View" action="Stats" />
		</a>
		<a href="/logs">
			<HomeAction preface="View" action="Logs" />
		</a>
	</div>
</div>
