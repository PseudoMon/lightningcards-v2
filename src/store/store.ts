import { writable } from "svelte/store"
import { v4 as uuid } from "uuid"
import { 
  getCurrentDeck, 
  saveCurrentDeck, 
  getLiveDeck,
  addNewCard as addNewCardAPI,
  saveCard as saveCardAPI,
  removeCard as removeCardAPI,
} from "./cardsAPI"
import type { LiveDeck, Card, CardFace } from "./types"

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

      const updatedDeck: LiveDeck = {
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
    }),

    useDifferentDeck: (uid: string) => update(store => {
      const newDeck = getLiveDeck(uid)
      return newDeck
    }),

    renameFace: (oldFace, newFace) => update(store => {
      // Replace the face that's the same as oldFace, leaves everything else be
      const newFaces: string[] = store.faces.map(face => face === oldFace ? newFace : face);
      
      // Do the same thing but with every card in this deck
      const newCards: Card[] = store.cards.map(card => {
        const newCardFaces: CardFace[] = card.faces.map(face => ({
          ...face,
          faceName: face.faceName === oldFace ? newFace : face.faceName
        }))

        const updatedCard: Card = { ...card, faces: newCardFaces } 
        saveCardAPI(updatedCard)
        return updatedCard
      })

      // Change main face if that's the face being renamed
      const newMainFace: string = store.mainFace === oldFace ? newFace : store.mainFace

      const updatedDeck: LiveDeck = { 
        ...store, 
        cards: newCards, 
        faces: newFaces, 
        mainFace: newMainFace  
      }

      saveCurrentDeck(updatedDeck)
      return updatedDeck
    }),
  }
}

function createCardsStore() {
  // usable for creating new deck after looking through card database
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