import { writable } from "svelte/store"
import { v4 as uuid } from "uuid"
import { 
  getCurrentDeck, 
  saveCurrentDeck, 
  addNewCard as addNewCardAPI,
  saveCard as saveCardAPI,
  removeCard as removeCardAPI,
} from "./cardsAPI"
import type { LiveDeck, Card } from "./types"

function createDeckStore() {
  const currentDeck: LiveDeck | null = getCurrentDeck();

  const { subscribe, update } = writable({
    uid: currentDeck?.uid || uuid(),
    title: currentDeck?.title || "Example Deck",
    mainFace: currentDeck?.mainFace || "Front",
    faces: currentDeck?.faces || ["Front", "Back"],
    cards: currentDeck?.cards || [],
  })

  return {
    subscribe,
    
    changeTitle: (newTitle: string) => update(store => {
      const updatedDeck: LiveDeck = {
        ...store,
        title: newTitle,
      }
      saveCurrentDeck(updatedDeck)

      return updatedDeck
    }),

    addNewCard: (newCard: Card) => update(store => {
      addNewCardAPI(newCard)

      const updatedDeck = {
        ...store,
        cards: store.cards.concat(newCard)
      }
      saveCurrentDeck(updatedDeck)

      return updatedDeck
    }),

    saveCard: (updatedCard: Card) => update(store => {
      saveCardAPI(updatedCard)

      const updatedDeckCards: Card[] = store.cards.map(card => {
        if (card.uid === updatedCard.uid) return updatedCard
        else return card
      }) 

      return {
        ...store,
        cards: updatedDeckCards
      }
    }),

    removeCard: (uid: string) => update(store => {
      removeCardAPI(uid)

      const updatedDeck = {
        ...store,
        cards: store.cards.filter(card => card.uid !== uid)
      }
      saveCurrentDeck(updatedDeck)

      return updatedDeck
    })
  }
}

function createCardsStore() {
  const { subscribe, update } = writable([]);

  return {
    subscribe,
    addCard: (newCard: Card) => update(store => {
      return { ...store, newCard }
    })
  }
} 

export const currentDeck = createDeckStore()
export const heldCards = createCardsStore()