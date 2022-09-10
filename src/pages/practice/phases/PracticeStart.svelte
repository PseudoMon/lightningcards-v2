<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { currentDeck } from "../../../store/store"

  const dispatch = createEventDispatcher()

  let faceToShowIdx: number = $currentDeck.faces[0] ? 0 : null
  let faceToGuessIdx: number = $currentDeck.faces[1] ? 1 : null

  function handleStart() {
    if (faceToShowIdx === null || faceToGuessIdx === null) return
    dispatch("start", { faceToShowIdx, faceToGuessIdx })
  }
</script>

<h1>Start Practicing</h1>
<p>Start practicing with all cards on this deck.</p>

<section class="choose-face">
  <label>
    Face to show:
    <select bind:value={faceToShowIdx}>
      {#each $currentDeck.faces as face, faceIdx}
        <option value={faceIdx}>{face}</option>
      {/each}
    </select>
  </label>

  <label>
    Face to guess:
    <select bind:value={faceToGuessIdx}>
      {#each $currentDeck.faces as face, faceIdx}
      <option value={faceIdx}>{face}</option>
      {/each}
    </select>
  </label>
</section>

<button 
  on:click={handleStart} 
  disabled={faceToShowIdx === null || faceToGuessIdx === null}>
  Start
</button>

<style>
  .choose-face {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;

    margin-bottom: 32px;
  }
</style>