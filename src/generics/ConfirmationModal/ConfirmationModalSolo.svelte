<script>
  import { createEventDispatcher } from "svelte"
  import { fly } from "svelte/transition"

  const dispatch = createEventDispatcher()
  export let isOpen = false

  $: if (isOpen) {
    document.body.style.overflow = 'hidden'
  }

  $: if (!isOpen) {
    document.body.style.overflow = null
  }

  function handleConfirm(e) {
    e.target.setAttribute("disabled", true)
    // Make sure double-click will not trigger
    isOpen = false
    dispatch('confirm')
  }

  function handleCancel() {
    isOpen = false
    dispatch('cancel')
  }
</script>

{#if isOpen}
<div class="modal" in:fly out:fly>
  <div class="panel">
    <slot></slot>
    <div class="confirmations">
      <button on:click={handleCancel}>Cancel</button>
      <button on:click={handleConfirm}>Confirm</button>
    </div>
  </div>
</div>
{/if}

<style>
  .modal {
    position: fixed;
    z-index: 99;
    background-color: rgba(0,0,0,0.5);
    top:  0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .panel {
    width: 80%;
    max-width: 500px;
    min-height: 100px;
    background-color: #fff;
    border-radius: 20px;
    padding: 1em 2em;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .confirmations {
    align-self:  end;
  }
</style>