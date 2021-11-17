<script>
	import ListBlocks from '$lib/ListBlocks.svelte';
	export let blockData = {};
	import camelCase from 'camelcase';

	const onLabelChange = (e) => {
		console.log(e.target.value);
		blockData.name = camelCase(e.target.value);
	}
</script>

<div class="container">
	<div>
		<label for="label">Label</label>
		<input type="text" name="label" on:change={onLabelChange} bind:value={blockData.properties.label} />
	</div>
	<div>
		<label for="name">Name</label>
		<input type="text" name="name" bind:value={blockData.name} />
	</div>
	<div>
		<label for="isVisible">On Load is Visible</label>
		<input type="checkbox" name="isVisible" bind:checked={blockData.isVisible} />
	</div>
	<hr/>
	<ListBlocks bind:blockData={blockData} />
	
</div>

<style>
	.container {
		border: solid 1px grey;
		padding: 0.4rem;
	}
	p {
		line-height: 1rem;
		margin: 0.2rem 0rem;
	}
</style>

