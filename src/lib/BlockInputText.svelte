<script>
	import camelCase from 'camelcase';
	export let blockData = {};
	// $: onIndexChange(index, blockData.blockId)
	// ===========================================================================
	// Functions
	// ===========================================================================
	const onLabelChange = (e) => {
		console.log(e.target.value);
		blockData.name = camelCase(e.target.value);
	}

</script>

<div class="container">
	<p>Text Field</p>
	<div>
		<label for="label">Label</label>
		<input type="text" name="label" on:change={onLabelChange} bind:value={blockData.properties.label} />
	</div>
	<div>
		<label for="name">Name</label>
		<input type="text" name="name" bind:value={blockData.name} />
	</div>
	<div>
		<label for="placeholder">Placeholder</label>
		<input type="text" name="placeholder" bind:value={blockData.properties.placeholder} />
	</div>
	<div>
		<label for="isVisible">On Load is Visible</label>
		<input type="checkbox" name="isVisible" bind:checked={blockData.isVisible} />
	</div>
	<div>
		<label for="required">Required</label>
		<input type="checkbox" name="required" bind:checked={blockData.properties.required} />
	</div>
	<hr />
	<div>
		<label for="supportText">Support Text</label>
		<input type="text" name="supportText" bind:value={blockData.options.supportText} />
	</div>
	<div>
		<label for="supportTextLocation">Support Text Location</label>
		<select name="supportTextLocation" bind:value={blockData.options.supportTextLocation}>
			<option value="above">Above</option>
			<option value="below">Below</option>
		</select>
	</div>
	<div>
		<label for="supportTextColor">Support Text Color</label>
		<input type="text" name="supportTextColor" bind:value={blockData.options.supportTextColor} />
	</div>
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
