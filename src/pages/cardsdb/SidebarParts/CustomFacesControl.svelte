<script lang="ts">
  import InlineAddableList from "../../../generics/InlineAddableList/InlineAddableList.svelte"

  export let className: string
  export let isUsingCustomFaces: boolean
  export let shownFaces: string[]
</script>

<div class={className}>
  <h3>Faces Shown</h3>
  
  <div style="margin-bottom: 1em;">
    <label>
      <input type="checkbox" bind:checked={isUsingCustomFaces}>
      Customize faces shown
    </label>
  </div>

  {#if isUsingCustomFaces}
  <InlineAddableList 
    label="Faces:" 
    addingLabel="Add Face" 
    bind:dataset={shownFaces} 
  />
  {/if}
</div>