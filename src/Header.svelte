<script>
    import { Link } from 'svelte-navigator'
    import SessionCounter from "./header/SessionCounter.svelte"
</script>

<header>
    <div class="title">Lightning Cards</div>
    
    <nav>
        <span><Link to="/">Main Menu</Link></span>
        <span><Link to="deck">View Deck</Link></span>
        <span><Link to="practice">Start Practice</Link></span>
    </nav>

    <SessionCounter/>
</header>

<style>
    header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: 60px;
        margin-bottom: 20px;
    }

    nav {
        display: flex;
    }

    nav > * {
        margin:  0 1.2em;
        display:  block;
    }
</style>
