<script lang="ts">
  import { tick } from "svelte"
  import ConfirmationModal from "../../../generics/ConfirmationModal.svelte"
  import { flash } from "../../../generics/MessageFlash/flasher"

  export let tags: string[]
  let addingNewTag: boolean = false
  let tagToRemove: string = ""
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

    if (tags.includes(newTag)) {
      flash(`This card already have the tag ${newTag}`)
      return
    }

    tags = tags.concat(newTag)
    addingNewTag = false
    newTag = ""
  }

  function handleConfirmRemoveTag() {
    tags = tags.filter(tag => tag !== tagToRemove)
  }
</script>

<div>
  <h3>Tags:</h3> 
  <ol class="tags">
    {#each tags as tag}
      <li on:click={() => tagToRemove = tag}>
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

<ConfirmationModal 
  isOpen={Boolean(tagToRemove)} 
  on:confirm={handleConfirmRemoveTag}
  on:cancel={() => tagToRemove = ""}
>
  <p>Remove the tag "{tagToRemove}" from this card?</p>
</ConfirmationModal>

<style>
  .tags {
    padding: 0;
    list-style: none;
    font-size:  1.2em;

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