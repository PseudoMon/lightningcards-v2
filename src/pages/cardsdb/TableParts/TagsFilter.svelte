<script lang="ts">
  import { tick } from "svelte"

  export let tags: string[]
  let addingNewTag: boolean = false
  let newTag: string = ""
  let newTagInput

  async function handleClickAddTag() {
    addingNewTag = true
    await tick()
    newTagInput.focus()
  }

  function handleSubmitNewTag() {
    if (!newTag) {
      addingNewTag = false
      return
    }

    tags = tags.concat(newTag)
    addingNewTag = false
    newTag = ""
  }

  function handleRemoveTag(tagToRemove) {
    tags = tags.filter(tag => tag !== tagToRemove)
  }
</script>

<div>
  <span>Filter by Tags:</span> 
  <ol class="tags">
    {#each tags as tag}
      <li on:click={() => handleRemoveTag(tag)}>
        <button>{tag}</button>
      </li>
    {/each}

    {#if addingNewTag}
    <form on:submit|preventDefault={handleSubmitNewTag}>
      <input type="text" bind:value={newTag} bind:this={newTagInput} />
    </form>
    {/if}

    <button class="add-tag" on:click={handleClickAddTag}>Add tag</button>
  </ol>
</div>

<style>
  .tags {
    display: inline-block;
    padding: 0;
    list-style: none;
  }

  .tags > * {
    margin: 4px;
  }

  li {
    display: inline-block;
    background-color: #eeeeee;
    padding:  0.2em 0.5em;
    border-radius:  5px;
  }

  li:hover {
    background-color: var(--color-removing);
    cursor: pointer;
  }

  button {
    background-color: transparent;
    border:  none;
  }

  .add-tag {
    opacity:  0.5;
  }

  .add-tag:hover {
    opacity:  1;
  }

  form {
    display:  inline;
  }

  input {
    width: 10em;
  }
</style>