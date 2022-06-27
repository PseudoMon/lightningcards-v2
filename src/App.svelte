<script lang="ts">
	import { Router, Link, Route } from 'svelte-navigator'
	import Header from './Header.svelte'
	import DeckEditPage from './pages/deck/DeckEditPage.svelte'
	import AddCardPage from "./pages/deck/AddCardPage.svelte"
	import EditCardPage from "./pages/deck/EditCardPage.svelte"
	export let name: string;
</script>

<Router>
<div class="container">

	<Header/>

	<main>
		<Route path="/">
			<h1>Welcome to Lightning Cards!</h1>
			<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
		</Route>
		
		<Route path="/deck/*">
			<Route path ="/">
				<DeckEditPage/>
			</Route>

			<Route path="/addcard">
				<AddCardPage/>
			</Route>

			<Route path="/editcard/:uid" let:params>
				<EditCardPage carduid={params.uid} />
			</Route>
		</Route>

		<Route path="/practice">
			PRACTICE HERE
		</Route>
	</main>

</div>
</Router>

<style>
	:global(:root) {
		--color-accent: #1EAEDB;
		--color-removing:  #FF6860;
		--color-soft:  #bdccff;
		--color-green: #bcf15b;
	}

	:global(a) {
		color: var(--color-accent);
	}

	:global(button) {
		cursor:  pointer;
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

	main { text-align: center; }
</style>