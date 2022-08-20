<script lang="ts">
  import { onMount } from "svelte"
  import { useNavigate } from "svelte-navigator"
  import { flash } from "../../generics/MessageFlash/flasher"
  import { getDecksDB } from "../../store/cardsAPI"
  import { DataDeck } from "../../store/types"
  import { currentDeck } from "../../store/store"

  const navigate = useNavigate()

  // Only contains uid and title
  interface SimpleDeck {
    uid: string,
    title: string,
  }

  let decks: SimpleDeck[] = null

  onMount(() => {
    const decksFromDB: DataDeck[] = getDecksDB()
    decks = decksFromDB.map((deck) => ({ uid: deck.uid, title: deck.title }))
  })

  function handleUseDeck(uid) {
    currentDeck.useDifferentDeck(uid)
    navigate("/deck")
    flash("Deck loaded!")
  }

  function handleRemoveDeck() {
    //TODO
  }
</script>

<main>
  <h1>Manage Decks</h1>

  {#if decks}
  <ol class="deck-list">
    {#each decks as deck}
       <li>
        <div class="deck-title">
          {deck.title}
        </div>
        <div class="deck-control">
          <button on:click={() => handleUseDeck(deck.uid)}>Use Deck</button>
          <button on:click={() => handleRemoveDeck(deck.uid)}>Remove Deck</button>
        </div>
      </li>
    {/each}
  </ol>
  {/if}
</main>

<style>
  ol {
    list-style: none;
  }

  .deck-list li {
    display: flex;
    gap: 60px;
    margin-bottom: 32px;
  }

  .deck-control {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 2;
  }

  .deck-title {
    flex:  1;
    border-radius: 3px;
    background-color: #bdccff;
    box-shadow: 1px 1px #8f8989;
    min-width: 120px;
    min-height: 60px;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-left: 12px;
    margin-top: 8px;

    padding: 1em 1.5em
  }

  .deck-title:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: -12px;
    top: -8px;
    z-index: -1;
    border-radius: 3px;
    background-color: #e8edff;
    box-shadow: 1px 1px #8f8989;
  }
</style>