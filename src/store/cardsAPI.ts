import type { Card, DataDeck, LiveDeck } from "./types"
import { flash } from "../generics/MessageFlash/flasher"

const DB_NAME = "cardsDatabase"
const CURRENT_DECK = "currentDeck"

function saveToLocal(location: string, data: any): void {
  console.log("Saved local data to", location)
  localStorage.setItem(location, JSON.stringify(data))
}

function loadFromLocal(location: string): any {
  console.log("Parsing local data at", location)
  return JSON.parse(localStorage.getItem(location))
}

export function getCardsDB(): Card[] {
  const cardsDatabase = loadFromLocal(DB_NAME)
  if (cardsDatabase === null) return []
  
  return cardsDatabase
}

export function saveCard(editedCard: Card): void {
  // We're assuming cards are already serializable 
  // If a Card's structure is going to be changed, make sure it's 
  // still serializable!
  const oldCardsDB = getCardsDB()
  
  const updatedCardsDB = oldCardsDB.map(oldCard => {
    if (oldCard.uid === editedCard.uid)
      return editedCard
    return oldCard  
  })

  saveToLocal(DB_NAME, updatedCardsDB)
}

export function addNewCard(newCard: Card): void {
  // We're gonna trust uuid to not have duplicates
  // so we aren't gonna check if the card's id already exist.
  const oldCardsDB: Card[] = getCardsDB()
  const newCardsDB: Card[] = oldCardsDB.concat(newCard)
  saveToLocal(DB_NAME, newCardsDB)
}

export function removeCard(uidToRemove: string): void {
  const oldCardsDB = getCardsDB()
  const updatedCardsDB = oldCardsDB.filter(card => card.uid !== uidToRemove)

  saveToLocal(DB_NAME, updatedCardsDB)
}

// export function getCardsFromTag(tag: string): Card[] {
//   const cards = getCardsDB()
//     .filter(card => card.tags.includes(tag))

//   return cards
// }

// export function getCardsFromCategory(category: string): Card[] {
//   const cards = getCardsDB()
//     .filter(card => card.category === category)

//   return cards
// }

export function getCardWithUID(cards: Card[], uid: string): Card | undefined {
  return cards.find(card => card.uid === uid)
}

export function getCardFromDB(uid: string): Card | undefined {
  const cardsDB = getCardsDB()
  return cardsDB.find(card => card.uid === uid)
}

export function getCurrentDeck(): LiveDeck | null {
  const currentDeck: DataDeck | null = JSON.parse(localStorage.getItem(CURRENT_DECK))
  
  if (!currentDeck) {
    return null
  }

  const cardsDB = getCardsDB()
  const cardsInDeck = currentDeck.cardIds.map(uid => getCardWithUID(cardsDB, uid))

  // Clean out undefineds and nulls from cardsInDeck
  const cleanCardsInDeck = cardsInDeck.filter(Boolean)
  if (cleanCardsInDeck.length !== cardsInDeck.length) {
    flash("Error: Some cards are missing from the database")
  }

  return { ...currentDeck, cards: cleanCardsInDeck}
}

export function saveCurrentDeck(deck: LiveDeck): void {
  const cardIds: string[] = deck.cards.map(card => card.uid)
  
  const dataDeck: DataDeck = {
    uid: deck.uid,
    title: deck.title,
    faces: deck.faces,
    mainFace: deck.mainFace,
    cardIds,
  }

  saveToLocal(CURRENT_DECK, dataDeck)
}