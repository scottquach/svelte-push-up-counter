<script lang="ts">
	import type { Log } from 'src/models/log.interface';

	export let log: Log;

	const formatter = new Intl.DateTimeFormat(undefined);
</script>

<!-- row 1 -->
<tr>
	<td>{formatter.format(log.timestamp)}</td>
	<td class="">{log.count}</td>
	<!-- <td>
		{#if log.goalMet}
			<i class="fa-solid fa-thumbs-up text-green-300" />
		{:else}
			<i class="fa-solid fa-thumbs-down text-red-300" />
		{/if}
	</td> -->
</tr>
