<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import type { Card } from "../../../store/types"

  const dispatch = createEventDispatcher()

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
      console.log('CORRECT')
      isAnswerCorrect = true
    }
    else {
      console.log("WRONG")
      isAnswerCorrect = false
    }

    isAsking = false
  }

  function handleEditCard() {
    // TODO. This might be difficult actually
  }

  function handleNext() {
    dispatch("next", { isAnswerCorrect })
    isAsking = true
  }
</script>

<div>
  <div 
    class="card-display" 
    class:wrong={!isAsking && !isAnswerCorrect} 
    class:correct={!isAsking && isAnswerCorrect}>
    {card.faces[askedFaceIndex].content}
  </div>

  {#if isAsking}
    <form class="answerbox">
      <input type="text" bind:value={answerInput}>
      <button on:click|preventDefault={handleEnter}>Enter</button>
    </form>
  {:else}
  <div class="confirmbox">
    <input type="text" value={answerInput} disabled>
    <button on:click={handleEditCard}>Edit Card</button>
    <button on:click={handleNext}>Next</button>
  </div>
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

  .card-display.wrong {
    background-color: #FF6860;
    color:  #563737;
  }

  .card-display.correct {
    background-color: #bcf15b;
    color: #231717; 
  }

  .answerbox, .confirmbox {
    width: 70%;
    margin: 1rem auto;
    padding: 0 0.5rem;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
  }

  .answerbox input, .confirmbox input {
    width: 100%;
    text-align: center;
    padding: 6px 10px
  }

  .answerbox button {
    width: 80%;
    max-width: 640px;
    background-color: var(--color-accent);
    color:  #fff;
  }
</style>