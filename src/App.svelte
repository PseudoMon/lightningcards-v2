<script lang="ts">
	import { Router, Link, Route } from 'svelte-navigator'
	import Header from './Header.svelte'
	import DeckEditPage from './pages/deck/DeckEditPage.svelte'
	import AddCardPage from "./pages/deck/AddCardPage.svelte"
	import EditCardPage from "./pages/deck/EditCardPage.svelte"
	import DeckSettingsPage from "./pages/deck/DeckSettingsPage.svelte"
	import CardsDatabasePage from "./pages/cardsdb/CardsDatabasePage.svelte"
	import ImportLegacyDeck from "./pages/cardsdb/ImportLegacyDeck.svelte"
	import ManageDecksPage from "./pages/decksdb/ManageDecksPage.svelte"
	import PracticePage from "./pages/practice/PracticePage.svelte"
</script>

<Router>
<div class="container">
	<Header/>

	<Route path="/">
		<h1>Welcome to Lightning Cards!</h1>
		<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	</Route>
	
	<Route path="/deck/*">
		<Route path="/">
			<DeckEditPage/>
		</Route>

		<Route path="/addcard">
			<AddCardPage/>
		</Route>

		<Route path="/editcard/:uid" let:params>
			<EditCardPage carduid={params.uid} />
		</Route>

		<Route path="/settings">
			<DeckSettingsPage/>
		</Route>
	</Route>

	<Route path="/cardsdb/*">
		<Route path="/">	
			<CardsDatabasePage />
		</Route>

		<Route path="/importlegacy">
			<ImportLegacyDeck />
		</Route>
	</Route>

	<Route path="/managedecks">
		<ManageDecksPage />
	</Route>

	<Route path="/practice">
		<PracticePage />
	</Route>


</div>
</Router>

<style>
	:global(:root) {
		--color-accent: #1EAEDB;
		--color-removing:  #FF6860;
		--color-soft:  #bdccff;
		--color-green: #bcf15b;
		--color-grey : #eeeeee;
	}

	:global(a) {
		color: var(--color-accent);
	}

	:global(button) {
		cursor:  pointer;
		padding: 10px 30px;
		min-height: 38px;
		border-radius: 4px;
		border: solid 1px #bbb;
		color: #333;
		background-color: transparent;
		letter-spacing: .1rem;
		text-transform: uppercase;
		font-size: 11px;
		font-weight: 600;
	}

	:global(button:hover) {
		color: #000;
		border-color: #888;
	}

	:global(select) {
		border: none;
		border-bottom: solid 2px #000;
	  padding: 5px 10px 5px 2px;
	 	background: transparent;
	}

	:global(select:focus, select:hover) {
		border-color: var(--color-accent);
	}

	:global(body) {
		font-size:  20px;
		font-family: "Raleway", sans-serif;
	}

	:global(h1) { 
		font-weight: normal; 
	}

	.container {
		width:  100%;
		max-width: 960px;	
		margin:  50px auto 0 auto;
	}

	:global(main > h1) { text-align: center; }

	:global(.generic-form) {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }

  :global(.generic-form > label), :global(.generic-form .form-child) {
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 1em;
    align-items: center;
  }

  :global(.generic-form > label) {
    text-align: right;
  }

  :global(.generic-form .form-child) {
    text-align: left;
  } 
</style>