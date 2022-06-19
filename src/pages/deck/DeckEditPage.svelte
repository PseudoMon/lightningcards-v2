<script>
  import { useNavigate, Link } from "svelte-navigator"
  import { get } from 'svelte/store'
  import { currentDeck } from '../../store/store'
  import { flash } from "../../generics/MessageFlash/flasher"

  const navigate = useNavigate()

  let editingName = false
  $: deckTitle = $currentDeck.title

  function handleSubmitTitle(e) {
    e.preventDefault()

    currentDeck.changeTitle(e.target.newTitle.value)
    editingName = false
  }

  function onOpenImportExporter() {}
  function onOpenManagingDecks() {}
</script>

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
  <button on:click={ () => editingName = true }>Edit Deck Name</button>
  <button on:click={ () =>  navigate("addcard") }>Add New Card</button>
  <button on:click={ onOpenImportExporter }>Import/Export Deck</button>
  <button on:click={ onOpenManagingDecks }>Manage Decks</button>
  <button on:click={ () => flash("Ello ello") }>CLICK</button>
</div>

<div class="cardlist">
  <ol>
    {#each $currentDeck.cards as card (card.uid)}
    <li><Link to={`editcard/${card.uid}`}>
      {card.faces[0].content}
    </Link></li>
    {/each}
  </ol>
</div>

<!-- <div class="cardlist">
  <div
  class="smallcard"
  onclick={ clickCard }
  each={ (card, i) in state.cards }
  data-cardindex={ i }
  >

    <div class="xbutton" onclick={ removeCard } onmouseover={ hoverX } onmouseleave={ unhoverX }>
      x
    </div>

    <div class="front" data-cardindex={ i }>
      { card.front }
    </div>

    <div class="back" data-cardindex={ i }>
      { card.back }
    </div>

  </div>
</div>
 -->
<style>
      .cardlist {
      margin-top: 10px;
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
    }

    .smallcard {
      background-color: #bdccff;
      border-radius: 3px;
      box-shadow: 1px 1px #8f8989;

      width: 30%;
      min-width: 160px;
      min-height: 6em;
      padding: 0.2em;
      margin: 0.5em;
      cursor: pointer;
      text-align: center;

      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
    }

    .smallcard:hover {
      background-color: #bcf15b;
      color: #231717;
    }

    .smallcard .front {
      font-size: 1.3em;
    }

    .smallcard.red, .smallcard.red.hover {
      background-color: #FF6860;
      color: #563737;
    }

    .xbutton {
      position: absolute;
      font-size: 1.2em;
      top: 0;
      right: 0.4em;
    }

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