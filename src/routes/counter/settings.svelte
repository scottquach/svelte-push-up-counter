<script>
	export let playBeep = true;
</script>

<label for="my-modal" class="btn btn-circle btn-lg bg-blue-400" aria-label="Settings">
	<i class="fa-solid fa-gear" />
</label>
<input type="checkbox" id="my-modal" class="modal-toggle" />
<label for="my-modal" class="modal cursor-pointer modal-bottom sm:modal-middle">
	<label class="modal-box relative pb-24" for="">
		<h3 class="font-bold text-xl">Counter settings</h3>
		<div class="form-control mt-4">
			<label class="label cursor-pointer">
				<span class="label-text text-lg">Play beep</span>
				<input type="checkbox" class="toggle" bind:checked={playBeep} />
			</label>
		</div>
	</label>
</label>
