<script>
  import BlockInputText from '$lib/BlockInputText.svelte';
  import BlockInputNumber from '$lib/BlockInputNumber.svelte';

  export let item = {};

  const {blockType, label} = item;

</script>

{#if blockType === "inputText"}
  <BlockInputText item={item} />
{:else if blockType === "inputNumber"}
  <BlockInputNumber item={item} />
{:else}
  <div></div>
{/if}
