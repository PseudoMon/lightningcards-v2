<script lang="ts">
  import { useNavigate, Link } from "svelte-navigator"
  import { get } from 'svelte/store'
  import { currentDeck } from '../../store/store'
  import { flash } from "../../generics/MessageFlash/flasher"
  import { askForConfirmation } from "../../generics/ConfirmationModal/confirmer"
  import CardList from "./ListParts/CardList.svelte"

  const navigate = useNavigate()

  let editingName = false
  $: deckTitle = $currentDeck.title

  function handleSubmitTitle(e) {
    e.preventDefault()

    currentDeck.changeTitle(e.target.newTitle.value)
    editingName = false
  }

  function onOpenImportExporter() {}

  async function confirmHello() {
    // Test function
    const answer: "confirm" | "cancel" = await askForConfirmation()
    console.log(answer)
  }
</script>

<main>
  <h1 class="deck-title">
    {#if !editingName}
      <span>{ deckTitle }</span>
    {/if}
    {#if editingName}
      <form if={ editingName } on:submit={ handleSubmitTitle }>
        <input
          id="namefield"
          type="text"
          name="newTitle"
          autocomplete="off"
          value={ deckTitle } />
      </form>
    {/if}
  </h1>

  <div class="header">
    <button on:click={() => navigate("settings")}>Edit Deck Settings</button>
    <button on:click={ () => editingName = true }>Edit Deck Name</button>
    <button on:click={ () =>  navigate("addcard") }>Add New Card</button>
    <button on:click={ onOpenImportExporter }>Import/Export Deck</button>
    <button on:click={ () => navigate("/managedecks") }>Manage Decks</button>
    <button on:click={ () => flash("Ello ello") }>CLICK</button>
    <button on:click={ confirmHello }>ASK</button>
    <Link to="/cardsdb"><button>Cards Database</button></Link>
  </div>

  <CardList />
</main>

<style>
    .header {
      text-align: center;
    }

    .header button {
      margin: 0.5em 1em;
    }

    .deck-title input {
      background-color: transparent;
      border-top: none;
      border-left: none;
      border-right: none;
      border-color: #5b5b5b;
      height: 1.2em;
    }
</style>