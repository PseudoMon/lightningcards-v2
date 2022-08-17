<script lang="ts">
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table"
  import Checkbox from "@smui/checkbox"
  import type { Card, CardFace as CardFaceType } from "../../../store/types"

  export let customFaces: boolean = false
  export let shownFaces: stringp[] = ["Front", "Back"]
  export let cardsShown: Card[] = []
  export let selectedCards = []

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

<div class="cards-table">
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
</div>

<style>
  * :global(table) {
    text-align: left;
    table-layout: fixed;
    width:  100%;
    border-spacing: 0;
  }

  * :global(th), * :global(td) {
    padding: 10px;
  }

  * :global(th) {
   /* border-bottom: solid black;*/
    background-color: #fafafa;
  }

  * :global(tr:hover) {
    background-color: #fafafa;
  }

  * :global(tr td) {
    border-bottom: solid 1px #eee;
  }

  * :global(.checkbox-col) {
    width: 1em;
  }

  * :global(.mdc-checkbox) {
    display: flex;
  }
</style>
