import { writable } from 'svelte/store'
import uniqid from 'uniqid'

// CHANGE ALL THIS
// DECK SHOULD USE DERIVE
// CARDS IN A DECK ARE EACH A STORE 
// DATA SHOULD ALSO EXIST INDEPEDENT OF STORE
// CREATE NEW CARD STORE WHEN CARD IS ADDED TO DECK
// VISIBLE DECK IS A NEBULOUS CONCEPT AAAAA
// NEVERMIND, STORE IS RUBBISH. IT IS A NEBULOUS CONCEPT
// MAYBE WE DON'T EVEN NEED IT


function createDeckStore() {
  const { subscribe, set, update } = writable({
    uid: uniqid(),
    title: "Example Deck",
    mainFace: "Front",
    cards: []
  })

  return {
    subscribe,

    getTitle: () => ("x"), //pending

    changeTitle: newTitle => update(store => ({
      ...store,
      title: newTitle
    })),

    addCard: newCard => update(store => ({
      ...store,
      cards: cards.concat([newCard])
    })),

    removeCard: cardToRemoveId => update(store => ({
      ...store,
      cards: cards.filter(card => card.uid !== cardToRemoveId)
    })),
  }
}

class Deck {
  constructor(title="Unnamed Deck", faces = ["Front", "Back"]) {
    this.uid = uniqid()
    this.title = title
    this.faces = faces
    this.mainFace = faces[0]
    this.tags = [] //TODO
    this.cardsIds = []
  }

  changeTitle(newTitle) {
    this.title = newTitle
  }

  addCard(newCardId) {
    this.cardsIds = this.cardsIds.concat([newCard])
  }

  removeCard(cardIdToRemove) {
    this.cardsIds = this.cardsIds.filter(cardId => cardId !== cardIdToRemove)
  }

  get serialized() {
    return {
      uid: this.uid,
      title: this.title,
      faces: this.faces,
      mainFace: this.mainFace,
      tags: this.tags
    }
  }
}

function createDeckStore(
  //TODO this should contain serialized deck data
  cardStores // should be an array of card stores
) {

  const deckObj = newDeck()

  const { subscribe, set, update } = derived(cardStore, cardStore => ({
    deckObj,
    deckData: deckObj.serialized,
    cards: cardStore
  }))

  return {
    subscribe,

    addCard
  }
}

function createDefaultFaces(faceNames = ["Front", "Back"]) {
  return faceNames.map(faceName => ({
     name: faceName
     content: "" 
  }))
}

class Card {
  // TODO: ability to create Card object from serialized data
  constructor(faces = ["Front", "Back"]) {
    this.uid = uniqid()
    this.faces = createDefaultFaces(faces)
    this.notes = ""
    this.tags = [] //TODO
  }

  changeNotes(newNote) {
    this.notes = newNote
  }

  // faceName shouldn't be editable
  // if you want to change it, remove then add again
  // TODOLATER: change face order?

  changeFaceContent(faceName, content) {
    this.faces = this.faces.map(face => {
      if (face.name === faceName) {
        return { name: faceName, content }
      }

      return face
    })
  }

  addFace(faceName) {
    //TODO throw some sort of error if a face with this name 
    // already exists
    if (this.faces.some(face => face.name === faceName)) {
      return
    }

    this.faces = this.faces.concat([{ 
      name: faceName,
      content: ""
    }])
  }

  removeFace(faceName) {
    this.faces = this.faces.filter(face => 
      face.name !== faceName
    )
  }

  get serialized() {
    return {
      uid: this.uid,
      faces: this.faces,
      notes: this.notes,
      tags: this.tags 
    }
  }
}

function createCardStore() {
  // Each card store contains the Card object,  
  // and its serialized data used for display
  // changes to the obj is always followed by reserialization
  // because otherwise components won't be able to listen
  // to the changes
  
  const obj = new Card()
  const { subscribe, set, update } = writable({
    obj, 
    data: obj.serialized
  })

  return { 
    subscribe, 

    changeNotes: newNote => update(store => {
      store.obj.changeNotes(newNote)
      return {...store, data: obj.serialized }
    })

    changeFaceContent: (faceName, content) => update(store => {
      store.obj.changeNotes(newNote)
      return {...store, data: obj.serialized }
    })

    addFace: faceName => update(store => {
      store.obj.addFace(faceName)
      return {...store, data: obj.serialized }
    })

    removeFace: faceName => update(store => {
      store.obj.removeFace(faceName)
      return {...store, data: obj.serialized }
    })


  }
}

export const currentDeck = createDeckStore()

/* 
type Card = {
  uid: string;
  faces: [CardFace];
  notes: string;
  tags: [string];
}

type CardFace = {
  faceName: string // e.g. "Hanzi", "Japanese"
  // default to "Front" and "Back"
  content: string
}

type Deck = {
  uid: string;
  cards: [Card];
  title: string;
  faces: [string]; // default to "Front", "Back"
  // when creating a card with this deck open,
  // these will be the default faces added.
  // Creating a new face when editing the card, or
  // adding more card with new faces,
  // will add the face to this list, 
  // but not otherwise modify existing cards
  mainFace: string; // default to "Front"
  tags: [string];
}

type CardsDB = [Card]
*/