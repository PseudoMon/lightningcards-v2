<script lang="ts">
  import { tick } from "svelte"

  export let faceName: string = ""
  export let mainText: string = ""
  export let synonyms: string[] = []

  let isEditing: boolean = !mainText ? true : false
  let mainTextInput

  async function handleClick(e) {
    isEditing = true

    await tick()
    mainTextInput.focus()
  }

  function handleSubmit() {
    if (!mainText) return
    isEditing = false
  }

  let addingNewSyn: boolean = false
  let newSyn: string
  let newSynInput

  async function handleClickAddSyn() {
    addingNewSyn = true
    await tick()
    newSynInput.focus()
  }

  function handleSubmitNewSyn() {
    if (!newSyn) {
      addingNewSyn = false
      return
    }

    synonyms = synonyms.concat(newSyn)
    addingNewSyn = false
    newSyn = ""
  }

  function handleDeleteSyn(index) {
    synonyms = synonyms.slice(0, index).concat(synonyms.slice(index + 1))
  }
</script>

<section class="card-face">
  <h2 class="face-label">
    {faceName}
  </h2>

  <div class="maintext" on:click={handleClick}>
    {#if !isEditing}
    <span>{mainText}</span>
    {:else}
    <form on:submit|preventDefault={handleSubmit}>
      <input type="text" bind:value={mainText} bind:this={mainTextInput}>
    </form>
    {/if}
  </div>

  <div class="synonyms">
    {#each synonyms as syn, index}
    <span class="syn">
      {syn}
      <button class="xbutton" on:click={() => handleDeleteSyn(index)}>
        x
      </button>
    </span>
    {/each}
      
    {#if addingNewSyn}
      <form on:submit|preventDefault={handleSubmitNewSyn}>
        <input type="text" bind:value={newSyn} bind:this={newSynInput} />
      </form>
    {:else}
      <button on:click={handleClickAddSyn}>Add synonym</button>
    {/if}
  </div>
</section>

<style>
  .card-face {
    margin:  20px auto;
    padding: 2.4rem 2rem;
    box-sizing: border-box;

    box-shadow: 2px 2px #8f8989;
    border-radius:  5px;
    background-color: #eeeeee;

    position:  relative;

    text-align:  center;
  }

  .card-face:nth-child(even) {
    background-color: #bdccff;
  }

  .face-label {
    position:  absolute;
    left:  0.5em;
    top:  0.5em;
    opacity:  0.5;

    text-transform:  capitalize;
    font-size:  1.8rem;

    font-weight:  400;
    margin-top:  0;
  }

  .maintext {
    font-size: 3.6rem;
    margin-bottom: 1rem;
  }

  .maintext input {
    width:  100%;
    text-align:  center;
    padding:  0;

    background-color:  transparent;
    border:  none;
    border-bottom:  solid 2px #5b5b5b;
  }

  .maintext input:focus {
    outline:  none;
    border-bottom:  solid 2px var(--color-accent);
  }

  .synonyms {
    display:  flex;
    justify-content: center;
  }

  .synonyms button {
    border:  none;
    cursor:  pointer;
    background-color: transparent;

    text-transform:  uppercase;
    font-size:  0.7em;
    line-height: 2.2em;
    font-weight:  500;
    
    opacity:  0.5;
  }

  .synonyms button:hover {
    opacity:  1;
  }

  .synonyms > * {
    margin: 0 0.2em;
  }

  .synonyms .xbutton {
    font-weight: 600;
    margin-left: 0;
    padding-left: 0;
  }

  .synonyms .xbutton:hover {
    color:  var(--color-removing);
  }

  .synonyms input {
    width: 8em;
    background-color:  transparent;
    border:  none;
    border-bottom:  solid 2px #5b5b5b;
  }

  .synonyms input:focus {
    outline:  none;
    border-bottom:  solid 2px var(--color-accent);
  }
</style>