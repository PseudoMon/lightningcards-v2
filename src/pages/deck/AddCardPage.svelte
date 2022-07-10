<script lang="ts">
  import { onMount } from "svelte"
  import { get } from "svelte/store"
  import { v4 as uuid } from "uuid"
  import { useNavigate } from "svelte-navigator"

  import { currentDeck } from "../../store/store"
  import type { Card, CardFace as CardFaceType } from "../../store/types"

  import { flash } from "../../generics/MessageFlash/flasher"
  import CardEditing from "./CardParts/CardEditing.svelte"

  const navigate = useNavigate()
  let cardData: Card = setInitialCardData()

  function setInitialCardData() {
    const faceNames = get(currentDeck).faces
    console.log(faceNames)
    
    const faces: CardFaceType[] = faceNames.map(faceName => ({
      faceName,
      content: "",
      synonyms: []
    })) 
    
    const tags: string[] = []
    const notes: string = ""

    return {
      uid: uuid(),
      faces,
      tags,
      notes,
    }
  }

  function handleSaveCard(e) {
    const newCard: Card = e.detail
    console.log("NEW CARD", newCard)

    currentDeck.addNewCard(newCard)
    flash("Card succesfully saved")
    navigate("/deck") 
  }
</script>

<main>
  <h1>Adding New Card</h1>
  <CardEditing cardData={cardData} on:saveCard={handleSaveCard} />
</main>