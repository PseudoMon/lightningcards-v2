<script lang="ts">
  import PracticeStart from "./phases/PracticeStart.svelte"
  let currentPhase = 0
</script>

<main>
  {#if currentPhase === 0}
  <PracticeStart on:start={() => currentPhase = 1}/>
  {/if}
</main>

<style>
  main {
    text-align: center;
  }
</style>