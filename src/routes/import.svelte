<script>
  import jsonFormat from 'json-format';
  let jsonInput = "test";

  const onSave = () => {
    
    var config = {
      type: 'space',
      size: 2
    };
    const json = jsonFormat(
		JSON.parse(jsonInput),
		config
	);
		localStorage.setItem('config-writer', json);
	};
</script>

<label for="config">Config JSON</label>
<textarea name="config" rows="50" bind:value={jsonInput}/>
<button on:click={onSave}>Save</button>

<style>

</style>