<script lang="ts">
  import { currentDeck } from "../../store/store"
  import { currentScore } from "../../store/scoreStore"
  import PracticeStart from "./phases/PracticeStart.svelte"
  import PracticeOngoing from "./phases/PracticeOngoing.svelte"
  import EndScreen from "./phases/EndScreen.svelte"
  let currentPhase = 0

  let askedFaceIndex: number = 0
  let answerFaceIndex: number = 1

  function handleStart({ detail }) {
    const { faceToShowIdx, faceToGuessIdx } = detail
    
    askedFaceIndex = faceToShowIdx
    answerFaceIndex = faceToGuessIdx
    currentPhase = 1
    currentScore.startPracticing($currentDeck.cards.length)
  }

  function handleEnd() {
    currentPhase = 2
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
      on:end={handleEnd}
    />
  {/if}
  {#if currentPhase === 2}
    <EndScreen />
  {/if}
</main>

<style>
  main {
    text-align: center;
  }
</style>