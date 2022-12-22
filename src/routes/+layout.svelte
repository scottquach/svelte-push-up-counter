<script>
	import { ProximitySensor } from '../plugins/proximity-sensor';
	import '../app.css';
	import { onMount } from 'svelte';

	let test = -1;

	onMount(() => {
		ProximitySensor.addListener('proximitySensorChange', (x) => (test = x.distance));

	});

</script>

<div class="w-screen h-screen">
	<slot />
</div>
