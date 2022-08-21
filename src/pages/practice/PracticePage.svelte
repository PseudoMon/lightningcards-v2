<script lang="ts">
  import PracticeStart from "./phases/PracticeStart.svelte"
  import PracticeOngoing from "./phases/PracticeOngoing.svelte"
  let currentPhase = 1

  let askedFaceIndex: number = null
  let answerFaceIndex: number = null

  function handleStart({ detail }) {
    const { faceToShowIdx, faceToGuessIdx } = detail
    
    askedFaceIndex = faceToShowIdx
    answerFaceIndex = faceToGuessIdx
  }
</script>

<main>
  {#if currentPhase === 0}
    <PracticeStart on:start={() => currentPhase = 1}/>
  {/if}
  {#if currentPhase === 1}
    <PracticeOngoing 
      askedFaceIndex={askedFaceIndex}
      answerFaceIndex={answerFaceIndex}
    />
  {/if}
</main>

<style>
  main {
    text-align: center;
  }
</style>