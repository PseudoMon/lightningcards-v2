<script lang="ts">
  import { tick } from "svelte"

  export let dataset: string[]
  export let label: string = ""
  export let addingLabel: string = "Add Data"
  export let style: string = ""
  export let className: string = ""

  let addingNewData: boolean = false
  let newData: string = ""
  let newDataInput

  async function handleClickAddData() {
    addingNewData = true
    await tick()
    newDataInput.focus()
  }

  function handleSubmitNewData() {
    if (!newData) {
      addingNewData = false
      return
    }

    dataset = dataset.concat(newData)
    addingNewData = false
    newData = ""
  }

  function handleRemoveData(dataToRemove) {
    dataset = dataset.filter(data => data !== dataToRemove)
  }
</script>

<div style={style} class={className}>
  {#if label}<span>{label}</span>{/if}
  <ol class="dataset">
    {#each dataset as data}
      <li on:click={() => handleRemoveData(data)}>
        <button type="button">{data}</button>
      </li>
    {/each}

    {#if addingNewData}
    <form on:submit|preventDefault={handleSubmitNewData}>
      <input type="text" bind:value={newData} bind:this={newDataInput} />
    </form>
    {/if}

    <button 
      type="button"
      class="add-data" 
      on:click={handleClickAddData}>
      {addingLabel}
    </button>
  </ol>
</div>

<style>
  .dataset {
    display: inline;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .dataset > * {
    margin: 1px 4px
  }

  li {
    display: inline-block;
    background-color: #eeeeee;
    border-radius:  5px;
  }

  li:hover {
    background-color: var(--color-removing);
    cursor: pointer;
  }

  button {
    background-color: transparent;
    border:  none;
    text-transform: none;
    font-size: 0.8em;
    padding: 10px 20px;
    font-weight: 400;
  }

  .add-data {
    opacity:  0.5;
  }

  .add-data:hover {
    opacity:  1;
  }

  form {
    display:  inline;
  }

  input {
    width: 10em;
  }
</style>