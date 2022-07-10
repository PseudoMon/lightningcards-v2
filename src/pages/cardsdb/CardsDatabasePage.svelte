<script lang="ts">
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table'
  import Checkbox from "@smui/checkbox"
  import type { Card, CardFace as CardFaceType } from "../../store/types"
  import TableCheckbox from "./TableParts/TableCheckbox.svelte"

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

  let selectedCardsIDs = []
</script>

<main>
  <h1>Cards Database</h1>
  <section class="cardsdb">
    <DataTable>
      <Head>
        <Row>
          <Cell checkbox class="checkbox-col">
            <Checkbox />
          </Cell>
          <Cell>Face 1</Cell>
          <Cell>Face 2</Cell>
          <Cell>Tags</Cell>
        </Row>
      </Head>
      <Body>
        {#each dummyCards as card (card.uid)}
          <Row>
            <Cell checkbox>
              <Checkbox
                bind:group={selectedCardsIDs}
                value={card.uid}
                valueKey={card.uid}
              />
            </Cell>
            <Cell>{card.faces[0].content}</Cell>
            <Cell>{card.faces[1].content}</Cell>
            <Cell>{card.tags.join(", ")}</Cell>
          </Row>
        {/each}
      </Body>
    </DataTable>
  </section>

  <section class="sidebar">
    <h2>Checked cards:</h2>
    <p>{selectedCardsIDs.join(", ")}</p>
  </section>
</main>

<style>
  .cardsdb :global(table) {
    border:  solid transparent;
    border-radius: 10px;
    text-align: left;

    table-layout: fixed;
    width:  100%;
    border-spacing:  0;
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
  }

  main > h1 {
    grid-column: 1 / -1;
  }
</style>


