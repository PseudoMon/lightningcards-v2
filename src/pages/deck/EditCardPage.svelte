<script lang="ts">
  import { onMount } from "svelte"
  import { useNavigate } from "svelte-navigator"

  import { currentDeck } from "../../store/store"
  import { getCardFromDB } from "../../store/cardsAPI"
  import type { Card, CardFace as CardFaceType } from "../../store/types"

  import { flash } from "../../generics/MessageFlash/flasher"
  import CardEditing from "./CardParts/CardEditing.svelte"

  const navigate = useNavigate()
  
  export let carduid: string = ""
  let cardData: Card
  let isLoading: boolean = true
  let isNotFound: boolean = false
  let isInCurrentDeck: boolean = true
  
  onMount(() => {
    if (carduid === "") {
      // No card is found, show error page
      isNotFound = true
      return
    }

    cardData = $currentDeck.cards.find(card => card.uid === carduid)
    
    if (!cardData) {
      isInCurrentDeck = false
      cardData = getCardFromDB()
    }

    if (!cardData) {
      isNotFound = true
    }

    isLoading = false
  })

  function handleSaveCard(e) {
    const updatedCard: Card = e.detail

    currentDeck.saveCard(updatedCard)
    flash("Card succesfully saved")
    navigate("/deck") 
  }

</script>

{#if !isLoading}
{#if isNotFound}
  <h1>Error 404: Card with id {carduid} is not found</h1>
{:else}
  <h1>Editing Card</h1>
  <CardEditing cardData={cardData} on:saveCard={handleSaveCard}/>
{/if}
{/if}