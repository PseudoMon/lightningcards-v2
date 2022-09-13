<script lang="ts">
  import { currentDeck } from '../../store/store'
  import InlineAddableList from "../../generics/InlineAddableList/InlineAddableList.svelte"
  import EditFaceModal from "./SettingParts/EditFaceModal.svelte"

  let editingName: boolean = false
  let selectedFace: { faceName: string, idx: number } = null

  function handleSubmitTitle(e) {
    e.preventDefault()

    currentDeck.changeTitle(e.target.newTitle.value)
    editingName = false
  }

  function handleRename(e: { detail: { newFace: string }}) {
    const newFace: string = e.detail.newFace
    currentDeck.renameFace(selectedFace.faceName, newFace)
    selectedFace = null
  }


</script>

<main>
  <h1 class="deck-title">
    {#if !editingName}
      <span>{ $currentDeck.title }: Settings</span>
    {/if}
    {#if editingName}
      <form if={ editingName } on:submit={ handleSubmitTitle }>
        <input
          id="namefield"
          type="text"
          name="newTitle"
          autocomplete="off"
          value={ deckTitle } />
      </form>
    {/if}
  </h1>

  <div>
    <form class="generic-form">
      <label>Deck Title
        <input type="text">
      </label>

      <label>Faces
        <ol class="form-child faces">
          {#each $currentDeck.faces as faceName, idx}
          <li>
            <button 
              type="button" 
              on:click={() => selectedFace = {faceName, idx}}>

            {faceName}</button>
          </li>
          {/each}
          <button 
            type="button"
            class="add-data" 
            >
            Add Face
          </button>
        </ol>
      </label>
    </form>
  </div>
</main>

{#if selectedFace}
  <EditFaceModal 
    faceToEdit={selectedFace.faceName} 
    on:close={() => selectedFace = null}
    on:rename={handleRename}
  />
{/if}

<style>
  .faces {
    display: inline-flex;
    column-gap: 4px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .faces li {
    display: inline-block;
    background-color: #eeeeee;
    border-radius:  5px;
  }

  .faces li:hover {
    background-color: var(--color-accent);
    cursor: pointer;
  }

  .faces button {
    background-color: transparent;
    border:  none;
    text-transform: none;
    font-size: 0.8em;
    padding: 10px 20px;
    font-weight: 400;
  }

  .faces .add-data {
    opacity:  0.5;
  }

  .faces .add-data:hover {
    opacity:  1;
  }
</style>