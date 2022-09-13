<script lang="ts">
  import { createEventDispatcher } from "svelte"

  const dispatch = createEventDispatcher();

  export let faceToEdit: string;
  let newFace: string;

  function handleCancel() {
    dispatch("close")
  }

  function handleRename() {
    dispatch("rename", { newFace })
  }

</script>

<div class="modal">
  <div class="panel">
    <h3>Rename Face</h3>
    <form class="generic-form">
      <label>Current face name:
        <input type="text" value={faceToEdit} disabled />
      </label>

      <label>Rename Face:
        <input type="text" bind:value={newFace} />
      </label>

      <p>This will apply to every card in this deck!</p>

      <div class="button-container">
        <button on:click|preventDefault={handleRename}>Rename</button>
        <button type="button" on:click={handleCancel}>Cancel</button>
        <button class="delete" type="button">Delete Face</button>
      </div>
    </form>
  </div>
</div>

<style>
  .modal {
      position: fixed;
      z-index: 99;
      background-color: rgba(0,0,0,0.5);
      top:  0;
      left: 0;
      right: 0;
      bottom: 0;

      display: flex;
      justify-content: center;
      align-items: center;
    }

  .panel {
    width: 80%;
    max-width: 500px;
    min-height: 100px;
    background-color: #fff;
    border-radius: 20px;
    padding: 1em 2em;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .button-container {
    display:  flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
    column-gap:  10px;
  }

  .button-container .delete {
    margin-right: auto;
  }
</style>