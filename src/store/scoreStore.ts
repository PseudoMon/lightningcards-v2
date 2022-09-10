import { writable } from "svelte/store"

// Stores scoring data when practicing, since the data gets shown on the header etc

function createScoreStore() {
  const { subscribe, update } = writable({
    isPracticing: false,
    cardsTotal: 0,
    cardsPassed: 0,
    cardsCorrect: 0, 
  })

  return {
    subscribe,
    startPracticing: (cardsTotal) => update(store => (
      { ...store, cardsTotal, isPracticing: true }
    )),
    
    finishPracticing: () => update(store => ({ ...store, isPracticing: false })),
    
    playedCorrectCard: (isCorrect) => update(store => {
      const cardsPassed = store.cardsPassed + 1
      let cardsCorrect = store.cardsCorrect
      if (isCorrect) {
        cardsCorrect+= 1
      }
      return { ...store, cardsPassed, cardsCorrect }
    }),
  }
}

export const currentScore = createScoreStore()