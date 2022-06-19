<script>
  import { onMount } from "svelte"
  import { fly, fade } from "svelte/transition"

  export let message = "Placeholder text"
  export let delay = 3000
  
  let isOpen
  let removalDelay

  onMount(() => {
    isOpen = true

    removalDelay = setInterval(() => isOpen = false, delay)
  })
</script>

{#if isOpen}
<div class="flash" transition:fly={{ y: -40 }}>
  { message }
</div>
{/if}

<style>
  .flash {
    position: fixed;
    top: 40px;
    width: 420px;
    left: calc(50vw - 210px);

    box-shadow: 0 3px 6px -4px #0000001f,0 6px 16px #00000014,0 9px 28px 8px #0000000d;
    
    text-align: center;
    padding: 0.5em 1em;
    box-sizing: border-box;
    background-color: white;
  }
</style>