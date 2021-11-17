<script>
	import ListInputOptions from '$lib/ListInputOptions.svelte';
	export let blockData = {};
	import camelCase	 from 'camelcase';
	let newOption = {
		value: '',
		label: ''
	};

	// ===========================================================================
	// Functions
	// ===========================================================================
	const onRemove = (index) => {
		const newArr = [...blockData.properties.options];
		newArr.splice(index, 1);
		blockData.properties.options = [...newArr];
	};

	const onLabelChange = (e) => {
		console.log(e.target.value);
		blockData.name = camelCase(e.target.value);
	}

	const addNewOption = () => {
		blockData.properties.options = [...blockData.properties.options, newOption];
		newOption = '';
	};
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

	<ListInputOptions bind:blockData />

	<!-- <p>Select Options</p>
	{#each blockData.properties.options as option, index}
		<div>
			<input type="text" bind:value={option.label} />
			<input type="text" bind:value={option.value} />
			<button
				on:click={() => {
					onRemove(index);
				}}>Remove</button
			>
		</div>
	{/each}
	<p>Add Option</p>
	<div>
		<label for="newOptionLabel">Label</label>
		<input type="text" name="newOptionLabel" bind:value={newOption.label} />
	</div>
	<div>
		<label for="newOptionValue">Value</label>
		<input type="text" name="newOptionValue" bind:value={newOption.value} />
	</div>

	<button on:click={addNewOption}>Add Option</button> -->
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
