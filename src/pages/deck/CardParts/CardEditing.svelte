<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte"
  import type { Card, CardFace as CardFaceType} from "../../../store/types"
  import { flash } from "../../../generics/MessageFlash/flasher"
  import Tags from "./Tags.svelte"
  import CardFace from "./CardFace.svelte"
  
  const dispatch = createEventDispatcher()
  export let cardData: Card

  // These card properties are only kept locally.
  // They'll be saved once the user click save
  // TODO: are you sure popup if user navigate away
  let uid: string = ""
  let faces: CardFaceType = []
  let tags: string[] = []
  let notes: string = ""

  onMount(() => {
    uid = cardData.uid
    tags = [...cardData.tags]
    faces = cardData.faces.map(face => ({...face}))
    notes = cardData.notes
  })

  function handleSaveCard() {
    if (faces.some(face => face.content === "")) {
      flash("Saving failed. Some card faces are empty.")
      return
    }

    const dispatchDetail: Card = { uid, tags, faces, notes}
    dispatch('saveCard', dispatchDetail)
  }
</script>

<div class="card editing">
  {#each faces as face}
  <CardFace 
    faceName={face.faceName} 
    bind:mainText={face.content} 
    bind:synonyms={face.synonyms}
  />
  {/each}

  <section class="extra-info">
    <Tags bind:tags={tags} />

    <div>
      <h3>Notes:</h3>
      <textarea class="notes" rows="5" bind:value={notes}></textarea>
    </div>
  </section>

  <button on:click={handleSaveCard}>Save Card</button>
</div>

<style>
  .card {
    width: 90%;
    max-width:  758px;
    margin: 0 auto;
    text-align: left;
  }

  .notes {
    width:  100%;
  }

  .extra-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
</style>