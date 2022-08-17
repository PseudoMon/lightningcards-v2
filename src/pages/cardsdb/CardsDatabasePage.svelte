<script lang="ts">
  import { Link } from "svelte-navigator"
  import type { Card, CardFace as CardFaceType } from "../../store/types"
  import { getCardsDB } from "../../store/cardsAPI"
  import InlineAddableList from "../../generics/InlineAddableList/InlineAddableList.svelte"
  import CardsTable from "./TableParts/CardsTable.svelte"
  import CustomFacesControl from "./SidebarParts/CustomFacesControl.svelte"

  const allCards: Card[] = getCardsDB();

  $: cardsShown = allCards.filter(card => {
    if (filterTags.length === 0) return true

    return filterTags.every(filterTag => card.tags.includes(filterTag))
    // Return true if every tag in the filter also exists within the card
  })

  let selectedCards = []
  let filterTags = []
  let shownFaces = ["Front", "Back"]
  let customFaces = false
  let uidToCheckbox = {}

  function toggleCardCheckbox(card) {
    const idx = selectedCards.map(card => card.uid).indexOf(card.uid)

    if (idx > -1) {
      selectedCards = [
        ...selectedCards.slice(0, idx), 
        ...selectedCards.slice(idx + 1)
      ]
    }
    else {
      selectedCards = selectedCards.concat(card)
    }
  }
</script>

<main>
  <h1>Cards Database</h1>
  <section class="cardsdb">
    <InlineAddableList 
      style="margin-bottom: 0.5em"
      label="Filter by Tags:" 
      addingLabel="Add tag" 
      bind:dataset={filterTags} />
    <CardsTable 
      customFaces={customFaces} 
      shownFaces={shownFaces} 
      cardsShown={cardsShown} 
      bind:selectedCards={selectedCards} />
  </section>

  <section class="sidebar">
    <Link to="importlegacy">Import Legacy Deck</Link>
    <CustomFacesControl 
      className="sidebar-control"
      bind:isUsingCustomFaces={customFaces}
      bind:shownFaces={shownFaces}
    />
    <h2>Checked cards:</h2>
    <p>{selectedCards.map(card => card.faces[0].content).join(", ")}</p>
  </section>
</main>

<style>
  main {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 10px;
  }

  main > h1 {
    grid-column: 1 / -1;
  }

  .sidebar input[type="checkbox"] {
    width: .8em;
    height: .8em;
  }

  .sidebar-control h3 {
    margin-bottom: 0.5em;
  }
</style>


