<script>
	import ListBlocks from '$lib/ListBlocks.svelte';
	import camelCase from 'camelcase';
	export let blockData = {};

	let layoutValue = blockData.properties.layout;
	console.log(layoutValue);

	$: {
		if (typeof layoutValue == 'string') {
			blockData.properties.layout = layoutValue.split(',').map((val) => parseInt(val));
		} else if (typeof layoutValue == 'array') {
			blockData.properties.layout = layoutValue;
		}
	}

	// ===========================================================================
	// Functions
	// ===========================================================================
	// const onLabelChange = (e) => {
	// 	blockData.name = camelCase(e.target.value);
	// };
</script>

<div class="container">
	<div>
		<label for="label">Label</label>
		<input type="text" name="label" bind:value={blockData.properties.label} />
	</div>
	<div>
		<label for="name">Name</label>
		<input type="text" name="name" bind:value={blockData.name} />
	</div>
	<div>
		<label for="isVisible">On Load is Visible</label>
		<input type="checkbox" name="isVisible" bind:checked={blockData.isVisible} />
	</div>
	<div>
		<label for="layout">Layout</label>
		<input type="text" name="layout" bind:value={layoutValue} />
	</div>
	<hr />
	<ListBlocks bind:blockData />
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
