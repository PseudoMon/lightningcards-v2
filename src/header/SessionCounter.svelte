<script lang="ts">
  import { currentDeck } from "../store/store"
  import { currentScore } from "../store/scoreStore"
</script>

<div>
  {#if $currentScore.isPracticing}
    {$currentScore.cardsCorrect}/{$currentScore.cardsPassed}/{$currentScore.cardsTotal} Cards 
  {:else}
    {$currentDeck.cards.length} cards in deck
  {/if}
</div>