<script lang="ts">
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table'
  import Checkbox from "@smui/checkbox"
  import type { Card, CardFace as CardFaceType } from "../../store/types"
  import TableCheckbox from "./TableParts/TableCheckbox.svelte"
  import TagsFilter from "./TableParts/TagsFilter.svelte"

  const dummyCards: Card[] = [
    {
      uid: "whatev",
      faces: [
        {
          faceName: "Front",
          content: "Alice",
          synonyms: [],
        },
        {
          faceName: "Back",
          content: "Bob",
          synonyms: [],
        },
      ],
      notes: "",
      tags: ["Test"]
    },
    {
      uid: "whadsadtev",
      faces: [
        {
          faceName: "Front",
          content: "Chernobog",
          synonyms: [],
        },
        {
          faceName: "Back",
          content: "Bielebog",
          synonyms: [],
        },
      ],
      notes: "",
      tags: ["Test2"]
    },
    {
      uid: "whgdsdatdsadev",
      faces: [
        {
          faceName: "Front",
          content: "Ferdinand",
          synonyms: [],
        },
        {
          faceName: "Back",
          content: "Lorenz",
          synonyms: [],
        },
      ],
      notes: "",
      tags: ["Test"]
    },
    {
      uid: "whaawwdsatev",
      faces: [
        {
          faceName: "Front",
          content: "Seth",
          synonyms: [],
        },
        {
          faceName: "Back",
          content: "Orson",
          synonyms: [],
        },
      ],
      notes: "",
      tags: ["Test", "Test2"]
    }
  ] 

  $: cardsShown = dummyCards.filter(card => {
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
    <TagsFilter bind:tags={filterTags} />
    <DataTable>
      <Head>
        <Row>
          <Cell checkbox class="checkbox-col">
            <Checkbox />
          </Cell>
          {#if customFaces}
            {#each shownFaces as face (face)}
              <Cell>{face}</Cell>
            {/each}
          {:else}
            <Cell>Face 1</Cell>
            <Cell>Face 2</Cell>
          {/if}
          <Cell>Tags</Cell>
        </Row>
      </Head>
      <Body>
        {#each cardsShown as card (card.uid)}
          <Row on:click={() => toggleCardCheckbox(card)}>
            <Cell checkbox>
              <Checkbox
                bind:group={selectedCards}
                value={card}
                valueKey={card.uid}
              />
            </Cell>
            {#if customFaces}
              {#each shownFaces as faceName (faceName)}
                <Cell>{
                  card.faces
                    .find(face => face.faceName === faceName)
                    ?.content || ""
                }</Cell>
              {/each}
            {:else}
              <Cell>{card.faces[0].content}</Cell>
              <Cell>{card.faces[1].content}</Cell>
            {/if}
            <Cell>{card.tags.join(", ")}</Cell>
          </Row>
        {/each}
      </Body>
    </DataTable>
  </section>

  <section class="sidebar">
    <div>
      <h3>Faces Shown</h3>
      <div>
        <label>
          <input type="checkbox" bind:checked={customFaces}>
          Customize faces shown
        </label>
      </div>
      <TagsFilter bind:tags={shownFaces} />
    </div>

    <h2>Checked cards:</h2>
    <p>{selectedCards.map(card => card.faces[0].content).join(", ")}</p>
  </section>
</main>

<style>
  .cardsdb :global(table) {
    text-align: left;
    table-layout: fixed;
    width:  100%;
    border-spacing: 0;
  }

  .cardsdb :global(th), .cardsdb :global(td) {
    padding: 10px;
  }

  .cardsdb :global(th) {
   /* border-bottom: solid black;*/
    background-color: #fafafa;
  }

  .cardsdb :global(tr:hover) {
    background-color: #fafafa;
  }

  .cardsdb :global(tr td) {
    border-bottom: solid 1px #eee;
  }

  .cardsdb :global(.checkbox-col) {
    width: 1em;
  }

  .cardsdb :global(.mdc-checkbox) {
    display: flex;
  }

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
    vertical-align: middle;
  }
</style>


