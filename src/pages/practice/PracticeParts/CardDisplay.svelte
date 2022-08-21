<script lang="ts">
  import type { Card } from "../../../store/types"

  export let card: Card
  export let askedFaceIndex: number = 0
  export let answerFaceIndex: number = 1

  let answerInput: string = ""
  let isAsking: boolean = true
  let isAnswerCorrect: boolean = false
  
  function handleEnter() {  
    const faceWithAnswer = card.faces[answerFaceIndex]
    const possibleAnswers = faceWithAnswer
      .synonyms.map(syn => syn.toLowerCase())
      .concat(faceWithAnswer.content.toLowerCase())

    if (possibleAnswers.includes(answerInput.toLowerCase())) {
      isAnswerCorrect = true
    }
    else {
      isAnswerCorrect = false
    }

    isAsking = false
  }
</script>

<div>
  <div class="card-display">
    Nyehehe
  </div>

  {#if isAsking}
    <form class="answerbox">
      <input type="text" bind:value={answerInput}>
      <button on:click|preventDefault={handleEnter}>Enter</button>
    </form>
  {/if}
</div>

<style>
  .card-display {
    text-align: center;
    font-size: 3rem;
    width: 80%;
    margin: 2.5rem auto;
    padding: 0.5rem 2rem;
    border-radius: 5px;
    background-color: #eeeeee;
    box-shadow: 5px 5px #8f8989;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  /* Larger than tablet */
  @media (min-width: 750px) {
    .card-display {
      height: 300px;
    }
  }

  .answerbox {
    width: 70%;
    margin: 1rem auto;
    padding: 0 0.5rem;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
  }

  .answerbox input {
    width: 100%;
    text-align: center;
  }

  .answerbox button {
    width: 80%;
    max-width: 640px;
  }

</style>