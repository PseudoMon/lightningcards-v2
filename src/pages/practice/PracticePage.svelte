<script lang="ts">
  import { currentScore } from "../../store/scoreStore"
  import PracticeStart from "./phases/PracticeStart.svelte"
  import PracticeOngoing from "./phases/PracticeOngoing.svelte"
  let currentPhase = 1

  let askedFaceIndex: number = 0
  let answerFaceIndex: number = 1

  function handleStart({ detail }) {
    const { faceToShowIdx, faceToGuessIdx } = detail
    
    askedFaceIndex = faceToShowIdx
    answerFaceIndex = faceToGuessIdx
    currentPhase = 1
    currentScore.startPracticing()
  }
</script>

<main>
  {#if currentPhase === 0}
    <PracticeStart on:start={handleStart}/>
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