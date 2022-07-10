<script lang="ts">
  import SvelteTable from "svelte-table"
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

  const columns = [
    // {
    //   key: "uid",
    //   title: "ID",
    //   value: data => data.uid,
    // },
    {
      key: "checkbox",
      title: "",
      value: data => "",
      renderComponent: {
        component: TableCheckbox,
        uid: 
      },
      headerClass: "checkbox-col",
    },
    {
      key: "frontContent",
      title: "Face 1",
      value: data => data.faces[0].content,
    },
    {
      key: "frontContent",
      title: "Face 2",
      value: data => data.faces[1].content,
    },
    {
      key: "tags",
      title: "Tags",
      value: data => data.tags,
      renderValue: data => data.tags.join(", "),
    }
  ]

   let checkedCardIDs: string[] = []
</script>

<main>
  <h1>Cards Database</h1>
  <section class="cardsdb">
    <SvelteTable 
      classNameTable="cards-table" 
      columns={columns} 
      rows={dummyCards} 
    />
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

  main {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }

  main > h1 {
    grid-column: 1 / -1;
  }
</style>


