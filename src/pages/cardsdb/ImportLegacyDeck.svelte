<script lang="ts">
  import { v4 as uuid } from "uuid"
  import { useNavigate } from "svelte-navigator"
  import type { Card, CardFace as CardFaceType, LiveDeck } from "../../store/types"
  import { addNewCard, addNewDeck } from "../../store/cardsAPI"
  import InlineAddableList from "../../generics/InlineAddableList/InlineAddableList.svelte"
  import { flash } from "../../generics/MessageFlash/flasher"
  import CardsTable from "./TableParts/CardsTable.svelte"

  const navigate = useNavigate();
  
  let tags: string[] = []
  let dataToImport: string = ""
  let deckTitle: string = ""
  let deckCards: Card[] = []
  let frontFaceName: string = "Front"
  let backFaceName: string = "Back"

  function handleImport() {
    let parsedData = ""
    try {
      parsedData = JSON.parse(dataToImport)
    }
    catch (e) {
      if (e instanceof SyntaxError) {
        flash("Error parsing data to import.")
        return
      }
    }

    deckTitle = parsedData.name  

    const parsedCards = parsedData.cards.map((card) => ({
      uid: uuid(),
      faces: [
        {
          faceName: "Front",
          content: card.front,
          synonyms: card.synFront,
        },
        {
          faceName: "Back",
          content: card.back,
          synonyms: card.synBack
        },
      ],
      notes: "",
      tags: [],
    }))

    deckCards = parsedCards
  }

  function handleSubmit() {
    const faceRenamedCards: Card[] = deckCards.map((card) => ({
      ...card,
      faces: [
        {...card.faces[0], faceName: frontFaceName },
        {...card.faces[1], faceName: backFaceName },
      ]
    }))

    const newDeck: LiveDeck = {
      uid: uuid(),
      title: deckTitle,
      faces: [frontFaceName, backFaceName],
      mainFace: frontFaceName,
      cards: faceRenamedCards,
    }


    faceRenamedCards.forEach((card) => {
      addNewCard(card);
    })

    addNewDeck(newDeck);

    flash("Cards succesfully imported!")
    navigate("/cardsdb")
  }


  // Adding tags
  $: deckCards = deckCards.map((card) => ({
    ...card,
    tags: tags,
  }))
  
</script>

<main>
  <h1>Import Legacy Deck</h1>
  <!-- TODO: upload .json -->
  <section class="importer">
    <p>Paste card data below and click the import button.</p>
    <textarea bind:value={dataToImport}></textarea>
    <button on:click={handleImport}>Import</button>
  </section>

  {#if deckTitle}
  <form class="deck-adjuster">
    <h2>Adjust Deck</h2>
    <label>
      Deck Title
      <input type="text" bind:value={deckTitle}>
    </label>

    <InlineAddableList 
      className="form-child"
      label="Tags to add" 
      addingLabel="Add tag" 
      bind:dataset={tags}
    />

    <label>
      Rename Face 1 to
      <input type="text" bind:value={frontFaceName}>
    </label>

    <label>
      Rename Face 2 to
      <input type="text" bind:value={backFaceName}>
    </label>
  </form>

  <h2>Cards Preview</h2>

  <div class="cards-preview">
    <CardsTable cardsShown={deckCards} />
  </div>

  <button on:click={handleSubmit}>Submit</button>
  {/if}

</main>

<style>
  main {
    text-align:  center;
  }

  .importer textarea {
    display: block;
    width: 80%;
    max-width:  500px;
    margin: 20px auto;
  }

  .deck-adjuster {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }

  .deck-adjuster > label, * :global(.form-child) {
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 1em;
  }

  .deck-adjuster > label, * :global(.form-child span) {
    text-align: right;
  }

  * :global(.form-child ol) {
    text-align: left;
  } 

  .cards-preview {
    width: 80%;
    max-width: 800px;
    margin:  10px auto;
  }
</style>