<script lang="ts">
  import InlineAddableList from "../../generics/InlineAddableList/InlineAddableList.svelte"
  let tags: string[] = []
</script>

<main>
  <h1>Import Legacy Deck</h1>
  <!-- TODO: upload .json -->
  <section class="importer">
    <p>Paste card data below and click the import button.</p>
    <textarea></textarea>
    <button>Import</button>
  </section>

  <form class="deck-adjuster">
    <h2>Adjust Deck</h2>
    <label>
      Deck Title
      <input type="text">
    </label>

    <InlineAddableList 
      className="form-child"
      label="Tags to add" 
      addingLabel="Add tag" 
      bind:dataset={tags}
    />

    <label>
      Rename Front to
      <input type="text">
    </label>

    <label>
      Rename Back to
      <input type="text">
    </label>
  </form>
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

  .deck-adjuster > label, .form-child {
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 1em;
  }

  .deck-adjuster > label {
    text-align: right;
  }
</style>