<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte"
  import { get } from "svelte/store"
  import { currentScore } from "../../../store/scoreStore"
  import { shuffleArray } from "../../../utils/utils"
  import type { Card } from "../../../store/types"
  import { currentDeck } from "../../../store/store"
  import CardDisplay from "../PracticeParts/CardDisplay.svelte"

  const dispatch = createEventDispatcher()

  export let askedFaceIndex: number = null
  export let answerFaceIndex: number = null

  let cardsInPlay: Card[] = []
  let currentCardCount: number = 0

  onMount(() => {
    const currentCards: Card[] = get(currentDeck).cards
    cardsInPlay = shuffleArray(currentCards)
  })

  function handleCorrectAnswer() {
    currentScore.playedCorrectCard(true)
  }

  function handleWrongAnswer() {
    currentScore.playedCorrectCard(false)
  } 

  function handleNextCard() {
    if (currentCardCount + 1 < cardsInPlay.length) {
      currentCardCount += 1
    } 
    else {
      dispatch("end")
    }
  }
</script>

{#if cardsInPlay.length}
<CardDisplay 
  card={cardsInPlay[currentCardCount]} 
  askedFaceIndex={askedFaceIndex}
  answerFaceIndex={answerFaceIndex}
  on:correct={handleCorrectAnswer}
  on:wrong={handleWrongAnswer}
  on:next={handleNextCard}
/>
 {/if}
