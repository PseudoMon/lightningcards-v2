<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte"
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
    cardsInPlay = shuffleArray(currentDeck.cards)
  })

  function handleCorrectAnswer() {

  }

  function handleWrongAnswer() {

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

<CardDisplay 
  card={cardsInPlay[currentCardCount]} 
  askedFaceIndex={askedFaceIndex}
  answerFaceIndex={answerFaceIndex}
  on:correct={handleCorrectAnswer}
  on:wrong={handleWrongAnswer}
  on:next={handleNextCard}
/>

