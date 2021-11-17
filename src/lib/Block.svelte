<script>
  import BlockInputText from '$lib/BlockInputText.svelte';
  import BlockInputNumber from '$lib/BlockInputNumber.svelte';
  import BlockInputDate from '$lib/BlockInputDate.svelte';
  import BlockInputTime from '$lib/BlockInputTime.svelte';
  import BlockSection from '$lib/BlockSection.svelte';
  import BlockFieldArray from '$lib/BlockFieldArray.svelte';
  import BlockLayout from '$lib/BlockLayout.svelte';
  import BlockTextArea from '$lib/BlockTextArea.svelte';
  import BlockRadioSelect from '$lib/BlockRadioSelect.svelte';
  import BlockCheckboxGroup from '$lib/BlockCheckboxGroup.svelte';
  import BlockSelectStandard from '$lib/BlockSelectStandard.svelte';
  import BlockInputSignature from '$lib/BlockInputSignature.svelte';
	import BlockInputFormula from '$lib/BlockInputFormula.svelte';
	import BlockHTML from '$lib/BlockHTML.svelte';

	export let blockData = {};
	export let index;
	export let onIndexChange;
	export let onBlockDelete;
	export let onMoveUp, onMoveDown;

  let blockType = blockData.blockType;
  let isOpen = false;

	// ===========================================================================
	// Functions
	// ===========================================================================
  const toggleOpen = () => {
		isOpen = !isOpen;
	}
	const onUpdate = () => {
		onIndexChange(index, blockData.blockId);
	};
</script>

<div class="container">
  <div>
    <div class="container__header">
      <button type="button" class="collapsible" on:click={toggleOpen}>{blockType} - {blockData.properties.label}</button>
    </div>
    <div class={`content ${isOpen ? 'active' : 'notActive' }`}>

      {#if blockType==="inputText"}
        <BlockInputText bind:blockData={blockData} />
      {:else if blockType==="inputNumber"}
        <BlockInputNumber bind:blockData={blockData} />
      {:else if blockType==="inputDate"}
        <BlockInputDate bind:blockData={blockData} />
      {:else if blockType==="inputTime"}
        <BlockInputTime bind:blockData={blockData} />
      {:else if blockType==="section"}
        <BlockSection bind:blockData={blockData} />
      {:else if blockType==="fieldArray"}
      <BlockFieldArray bind:blockData={blockData} />  
      {:else if blockType==="layout"}
        <BlockLayout bind:blockData={blockData} />
      {:else if blockType==="textArea"}
        <BlockTextArea bind:blockData={blockData} />
      {:else if blockType==="radioSelect"}
        <BlockRadioSelect bind:blockData={blockData} />
      {:else if blockType==="checkboxGroup"}
        <BlockCheckboxGroup bind:blockData={blockData} />
      {:else if blockType==="selectStandard"}
        <BlockSelectStandard bind:blockData={blockData} />
      {:else if blockType==="inputSignature"}
        <BlockInputSignature bind:blockData={blockData} />
				{:else if blockType==="html"}
			<BlockHTML bind:blockData={blockData} />
				{:else if blockType==="inputFormula"}
        <BlockInputFormula bind:blockData={blockData} />
      {/if}
    </div>
  </div>

	<hr />
	<div>
		<label for="index">Index</label>
		<input type="number" class="inputNumber" name="index" bind:value={index} on:blur={onUpdate} />
	</div>

	<button
		on:click={() => {
			onMoveUp(blockData.blockId);
		}}>Move Up</button
	>
	<button
		on:click={() => {
			onMoveDown(blockData.blockId);
		}}>Move Down</button
	>
	<button
		on:click={() => {
			onBlockDelete(blockData.blockId);
		}}>Delete</button
	>
</div>

<style>
	.container {
		border: solid 1px grey;
		padding: 0.4rem;
	}
  .collapsible {
		background-color: blue;
		color:white;
		cursor: pointer;
		padding: 18px;
		width: 100%;
		border: none;
		text-align: left;
		outline: none;
		font-size: 15px;
	}
	.active {
		display: block;
	}
	.notActive {
		display: none;
	}
	.active, .collapsible:hover {
		background-color: #ccc;
	}
	.content {
		padding: 0.5rem 0.5rem;
		overflow: hidden;
		background-color: #f1f1f1;
		transition: max-height 0.2s ease-out;
	}
	p {
		line-height: 1rem;
		margin: 0.2rem 0rem;
	}
</style>
