<script lang="ts">
  import { Link } from "svelte-navigator"
  import { currentDeck } from "../../../store/store"
  import type { Card } from "../../../store/types"
  import { askForConfirmation } from "../../../generics/ConfirmationModal/confirmer"

  let cards: Card[] = $currentDeck.cards
  let cardToRemove: string | null = null

  function handleMouseoverX(e) {
    e.target.parentNode.classList.add("red")
  }

  function handleMouseleaveX(e) {
    e.target.parentNode.classList.remove("red")
  }

  async function handleRemoveCard(cardUid) {
    const answer: "confirm" | "cancel" = 
      await askForConfirmation("Are you sure you want to remove this card?")
    
    if (answer === "confirm") {
      currentDeck.removeCard(cardUid)
    }
  }
</script>

<section class="cardlist">
  {#each $currentDeck.cards as card (card.uid)}
    <Link class="smallcard" to={`editcard/${card.uid}`}>
      <div class="xbutton" 
        on:click|preventDefault={() => handleRemoveCard(card.uid)}
        on:mouseover={handleMouseoverX}
        on:mouseleave={handleMouseleaveX}
      >
        X
      </div>

      <div class="fronttext">
        {card.faces[0].content}
      </div>
      <div class="backtext">
        {card.faces[1].content}
      </div>
    </Link>
  {/each}
</section>

<style>
  .cardlist {
    margin-top: 10px;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    gap:  0.5em;
  }

  .cardlist :global(.smallcard) {
    width: 30%;
    min-width:  160px; 
    min-height:  6em;
    text-align: center;

    background-color:  var(--color-soft);
    border-radius: 3px;
    box-shadow:  1px 1px #8f8989;

    display: flex;
    flex-direction: column;
    justify-content: center;
    position:  relative;

    color: #000;
    text-decoration: none;
  }

  .cardlist :global(.smallcard.red:hover) {
    background-color: var(--color-removing);
    color:  #fff;
  }

  .cardlist :global(.smallcard):hover {
    background-color: var(--color-green);
  }

  .fronttext {
    font-size: 1.3em;
    margin-bottom: 0.2em;
  }

  .xbutton {
    display: block;
    position: absolute;
    top: 4px;
    right: 8px;
  }
</style>