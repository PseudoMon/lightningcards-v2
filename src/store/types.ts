export interface CardFace {
  faceName: string; // e.g. "Hanzi", "Japanese"
  // default to "Front" and "Back"
  content: string;
  synonyms: string[];
}

export interface Card {
  uid: string;
  faces: CardFace[];
  notes: string;
  //category: string; // Have to be an existing category. Can TS check that?
  tags: string[];
}

interface Category {
  // Do we need this?
  name: string;
  cards: Card[];
}

interface Deck {
  uid: string; 
  title: string;
  faces: string[];
  mainFace: string;
}

export interface DataDeck extends Deck {
  // Deck as it lives in storage
  cardIds: string[]; // array of Card UID
}

export interface LiveDeck extends Deck {
  // Deck as it is shown onsite
  cards: Card[];
}

/* A note about faces 
 A deck has default faces. When creating a card or editing an existing
 card when that deck is open, the card will have those default faces.
 Existing cards will not be modified. During practice, cards without the 
 relevant faces will be removed from play (with a notification to the user).
*/