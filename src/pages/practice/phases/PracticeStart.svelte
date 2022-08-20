<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { currentDeck } from "../../../store/store"

  const dispatch = createEventDispatcher()

  let faceToShow: string = $currentDeck.faces[0] ?? null
  let faceToGuess: string = $currentDeck.faces[1] ?? null
</script>

<h1>Start Practicing</h1>
<p>Start practicing with all cards on this deck.</p>

<section class="choose-face">
  <label>
    Face to show:
    <select bind:value={faceToShow}>
      {#each $currentDeck.faces as face}
      <option value={face}>{face}</option>
      {/each}
    </select>
  </label>

  <label>
    Face to guess:
    <select bind:value={faceToGuess}>
      {#each $currentDeck.faces as face}
      <option value={face}>{face}</option>
      {/each}
    </select>
  </label>
</section>

<button on:click={() => dispatch("start")}>Start</button>

<style>
  .choose-face {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;

    margin-bottom: 32px;
  }
</style>