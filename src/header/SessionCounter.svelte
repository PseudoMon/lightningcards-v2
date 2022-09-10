<script lang="ts">
  import { currentDeck } from "../store/store"
  import { currentScore } from "../store/scoreStore"
</script>

<div>
  {#if $currentScore.isPracticing}
    x/x/x Cards 
  {:else}
    {$currentDeck.cards.length} cards in deck
  {/if}
</div>