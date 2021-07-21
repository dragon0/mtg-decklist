
export abstract class Card {
  name: string = "";
  type: string = "";
  type_line: string = "";
  oracle_text: string = "";
  scryfall_uri: string = "";
  scryfall_user_uri: string = "";
  image_uri: string = "";
};

export class LandCard extends Card {
}

export class InstantCard extends Card {
}

export class SorceryCard extends Card {
}

export class CreatureCard extends Card {
  cmc: number = 0;
  mana_cost: string = "";
  power: string = "";
  toughness: string = "";
}

export class PlaneswalkerCard extends Card {
  loyalty: string = "";
}

export class Deck {
  name: string = "";
  id: number = 0;
  cards: Card[] = [];
}

