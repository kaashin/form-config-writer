<script>
	import Block from '$lib/Block.svelte';
	import { getBlockType } from '$utils/blockTypes';
	import { arrayMoveItem } from '$utils/helpers';
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { overrideItemIdKeyNameBeforeInitialisingDndZones } from 'svelte-dnd-action';

	let newInputItem = 'inputText';

	export let blockData = {};
	let blocks = blockData.blocks;
	$: blockData.blocks = blocks;

	console.log({ blockData });

	// Options for blocks
	const options = [
		{ name: 'inputText', label: 'Text Input' },
		{ name: 'inputNumber', label: 'Number Input' },
		{ name: 'textArea', label: 'Text Area' },
		{ name: 'inputDate', label: 'Date Input' },
		{ name: 'inputTime', label: 'Time Input' },
		{ name: 'selectStandard', label: 'Select Standard' },
		{ name: 'checkboxGroup', label: 'Checkbox Group' },
		{ name: 'radioSelect', label: 'Radio Select' },
		// { name: 'inputSignature', label: 'Input Signature' },
		{ name: 'html', label: 'HTML' },
		{ name: 'inputFormula', label: 'Formula' },
		{ name: 'fieldArray', label: 'Field Array' },
		{ name: 'layout', label: 'Layout' },
		{ name: 'section', label: 'Section' }
	];
	// ===========================================================================
	// DND Config
	// ==========================================================================
	const flipDurationMs = 200;
	let dropTargetStyle;
	// overrideItemIdKeyNameBeforeInitialisingDndZones('blockId');

	// =============================================================================
	// Functions
	// =============================================================================
	const addField = () => {
		let newField = getBlockType(newInputItem);

		// fields = [...fields, newField];
		blocks = [...blocks, newField];
	};
	const onIndexChange = (newIndex, blockId) => {
		console.log({ newIndex, blockId });
		const origIndex = blocks.findIndex((val) => blockId === val.blockId);
		const newArr = arrayMoveItem(blocks, origIndex, newIndex);
		blocks = [...newArr];
	};

	const onBlockDelete = (blockId) => {
		const index = blocks.findIndex((val) => blockId === val.blockId);
		const newArr = [...blocks];
		newArr.splice(index, 1);
		blocks = [...newArr];
	};

	const onMoveUp = (blockId) => {
		const index = blocks.findIndex((val) => blockId === val.blockId);
		const newArr = arrayMoveItem(blocks, index, index - 1);
		blocks = [...newArr];
	};
	const onMoveDown = (blockId) => {
		const index = blocks.findIndex((val) => blockId === val.blockId);
		const newArr = arrayMoveItem(blocks, index, index + 1);
		blocks = [...newArr];
	};

	function handleDndConsider(e) {
		console.log(e.detail);
		blocks = e.detail.items;
		dropTargetStyle = {
			'background-color': 'blue'
		};
	}
	function handleDndFinalize(e) {
		blocks = e.detail.items;
	}

	$: {
		console.log('number of blocks');
		console.log(blocks.length);
		if (blocks.length) {
		}
	}
</script>

<section>
	<h3>Form Blocks</h3>
	<div>
		<label>Add item</label>
		<select bind:value={newInputItem}>
			{#each options as option}
				<option value={option.name}>{option.label}</option>
			{/each}

			<!-- <option value="inputNumber">Number Input</option> -->
		</select>
		<button on:click={addField}>Add field</button>
	</div>
	<div
		use:dndzone={{
			items: blocks,
			flipDurationMs,
			dropTargetStyle,
			dropTargetClasses: ['dndzone__hover']
		}}
		on:consider={handleDndConsider}
		on:finalize={handleDndFinalize}
		class="dndzone"
	>
		{#if blocks.length < 1}
			<div class="empty">
				<span>Add a field</span>
			</div>
		{/if}
		{#each blocks as field, index (field.blockId)}
			<div animate:flip={{ duration: flipDurationMs }}>
				<Block
					bind:blockData={field}
					{index}
					{onIndexChange}
					{onBlockDelete}
					{onMoveUp}
					{onMoveDown}
				/>
			</div>
		{/each}
	</div>
</section>

<style>
	.dndzone {
		min-height: 100px;
	}
	.empty {
		width: 100%;
		min-height: 100px;
		border: dashed 2px grey;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
