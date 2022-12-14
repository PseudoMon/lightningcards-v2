import type { Card, DataDeck, LiveDeck } from "./types"
import { flash } from "../generics/MessageFlash/flasher"

const DB_NAME = "cardsDatabase"
const CURRENT_DECK = "currentDeck"
const DECKS_DB = "decksDatabase"

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

export function getDecksDB(): DataDeck[] {
  const decksDatabase = loadFromLocal(DECKS_DB)
  if (decksDatabase === null) return []

  return decksDatabase
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

function liveDeckToDataDeck(deck: LiveDeck): DataDeck {
  const cardIds: string[] = deck.cards.map(card => card.uid)
  
  const dataDeck: DataDeck = {
    uid: deck.uid,
    title: deck.title,
    faces: deck.faces,
    mainFace: deck.mainFace,
    cardIds,
  }

  return dataDeck
}

function dataDeckToLiveDeck(deck: DataDeck): LiveDeck {
  const cardIds: string[] = deck.cardIds
  const cardsDB: Card[] = getCardsDB()

  const includedCards: Card[] = cardsDB.filter(card => cardIds.includes(card.uid))
  const liveDeck: LiveDeck = {
    uid: deck.uid, 
    title: deck.title,
    faces: deck.faces,
    mainFace: deck.mainFace,
    cards: includedCards,
  }

  return liveDeck
}

export function saveCurrentDeck(deck: LiveDeck): void {
  const dataDeck: DataDeck = liveDeckToDataDeck(deck)

  saveToLocal(CURRENT_DECK, dataDeck)
  saveDeckToDB(dataDeck)
}

export function addNewDeck(deck: LiveDeck): void {
  const newDataDeck = liveDeckToDataDeck(deck)

  const oldDecksDB = getDecksDB()
  const newDecksDB = oldDecksDB.concat(newDataDeck)

  saveToLocal(DECKS_DB, newDecksDB)
}

function saveDeckToDB(deckToSave: DataDeck): void {
  // TODO: It might be more efficient to only do this when switching decks,
  // or maybe you shouldn't have currentDeck in local 
  // storage at all (other than the uid)

  const currentDecks: DataDeck[] = getDecksDB()

  if (!currentDecks.find(deck => deck.uid === deckToSave.uid)) {
    // If it doesn't yet exist, add it
    saveToLocal(DECKS_DB, currentDecks.concat(deckToSave))
  }
  else {
    // If it already exist, replace existing one
    const newDecks: DataDeck[] = currentDecks.map(deck => {
      if (deck.uid === deckToSave.uid) return deckToSave
      else return deck
    })
    saveToLocal(DECKS_DB, newDecks)
  }
}

export function getLiveDeck(uid: string): LiveDeck {
  const allDecks: DataDeck[] = getDecksDB()

  const foundDataDeck: DataDeck = allDecks.find(deck => deck.uid === uid)
  if (!foundDataDeck) {
    // throw something here
  }

  const foundLiveDeck: LiveDeck = dataDeckToLiveDeck(foundDataDeck)
  return foundLiveDeck
}