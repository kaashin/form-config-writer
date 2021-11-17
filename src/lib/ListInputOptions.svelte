<script>
	export let blockData = {};
	let newOption = {
		label: '',
		value: ''
	};

	// ===========================================================================
	// Functions
	// ===========================================================================
	const onRemove = (index) => {
		const newArr = [...blockData.properties.options];
		newArr.splice(index, 1);
		blockData.properties.options = [...newArr];
	};

	const addNewOption = () => {
		blockData.properties.options = [...blockData.properties.options, newOption];
		// Reset new option
		newOption = {
			label: '',
			value: ''
		};
	};
</script>

<p>Select Input Options</p>
<table>
	<thead>
		<tr>
			<td>Label</td>
			<td>Value</td>
			<td>Action</td>
		</tr>
	</thead>
	<tbody>
		<tr />
		{#each blockData.properties.options as option, index}
			<tr>
				<td>
					<input type="text" bind:value={option.label} />
				</td>
				<td>
					<input type="text" bind:value={option.value} />
				</td>
				<td>
					<button
						on:click={() => {
							onRemove(index);
						}}>Remove</button
					>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
<p>Add Option</p>
<div>
	<label for="newOptionLabel">Label</label>
	<input type="text" name="newOptionLabel" bind:value={newOption.label} />
</div>
<div>
	<label for="newOptionValue">Value</label>
	<input type="text" name="newOptionValue" bind:value={newOption.value} />
</div>

<button on:click={addNewOption}>Add Option</button>

<style>
	input {
		width: 95%;
	}
</style>
