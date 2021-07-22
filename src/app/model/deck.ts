
export abstract class Card {
  constructor(
    public name: string,
    public type: string,
    public type_line: string,
    public oracle_text: string,
    public scryfall_api_uri: string,
    public scryfall_user_uri: string,
    public image_uri: string,
  ){}
};

export class LandCard extends Card {
  constructor(
    public name: string,
    public type_line: string,
    public oracle_text: string,
    public scryfall_api_uri: string,
    public scryfall_user_uri: string,
    public image_uri: string,
  ){
    super(
      name,
      'land',
      type_line,
      oracle_text,
      scryfall_api_uri,
      scryfall_user_uri,
      image_uri,
    )
  }
}

export abstract class SpellCard extends Card {
  constructor(
    public name: string,
    public type: string,
    public type_line: string,
    public oracle_text: string,
    public scryfall_api_uri: string,
    public scryfall_user_uri: string,
    public image_uri: string,
    public cmc: number,
    public mana_cost: string,
  ){
    super(
      name,
      type,
      type_line,
      oracle_text,
      scryfall_api_uri,
      scryfall_user_uri,
      image_uri,
    )
  }
}

export class InstantCard extends SpellCard {
  constructor(
    public name: string,
    public type_line: string,
    public oracle_text: string,
    public scryfall_api_uri: string,
    public scryfall_user_uri: string,
    public image_uri: string,
    public cmc: number,
    public mana_cost: string,
  ){
    super(
      name,
      'instant',
      type_line,
      oracle_text,
      scryfall_api_uri,
      scryfall_user_uri,
      image_uri,
      cmc,
      mana_cost,
    )
  }
}

export class SorceryCard extends SpellCard {
  constructor(
    public name: string,
    public type_line: string,
    public oracle_text: string,
    public scryfall_api_uri: string,
    public scryfall_user_uri: string,
    public image_uri: string,
    public cmc: number,
    public mana_cost: string,
  ){
    super(
      name,
      'sorcery',
      type_line,
      oracle_text,
      scryfall_api_uri,
      scryfall_user_uri,
      image_uri,
      cmc,
      mana_cost,
    )
  }
}

export class EnchantmentCard extends SpellCard {
  constructor(
    public name: string,
    public type_line: string,
    public oracle_text: string,
    public scryfall_api_uri: string,
    public scryfall_user_uri: string,
    public image_uri: string,
    public cmc: number,
    public mana_cost: string,
  ){
    super(
      name,
      'enchantment',
      type_line,
      oracle_text,
      scryfall_api_uri,
      scryfall_user_uri,
      image_uri,
      cmc,
      mana_cost,
    )
  }
}

export class ArtifactCard extends SpellCard {
  constructor(
    public name: string,
    public type_line: string,
    public oracle_text: string,
    public scryfall_api_uri: string,
    public scryfall_user_uri: string,
    public image_uri: string,
    public cmc: number,
    public mana_cost: string,
  ){
    super(
      name,
      'artifact',
      type_line,
      oracle_text,
      scryfall_api_uri,
      scryfall_user_uri,
      image_uri,
      cmc,
      mana_cost,
    )
  }
}

export class CreatureCard extends SpellCard {
  constructor(
    public name: string,
    public type_line: string,
    public oracle_text: string,
    public scryfall_api_uri: string,
    public scryfall_user_uri: string,
    public image_uri: string,
    public cmc: number,
    public mana_cost: string,
    public power: string,
    public toughness: string,
  ){
    super(
      name,
      'creature',
      type_line,
      oracle_text,
      scryfall_api_uri,
      scryfall_user_uri,
      image_uri,
      cmc,
      mana_cost,
    )
  }
}

export class PlaneswalkerCard extends SpellCard {
  constructor(
    public name: string,
    public type_line: string,
    public oracle_text: string,
    public scryfall_api_uri: string,
    public scryfall_user_uri: string,
    public image_uri: string,
    public cmc: number,
    public mana_cost: string,
    public loyalty: string,
  ){
    super(
      name,
      'planeswalker',
      type_line,
      oracle_text,
      scryfall_api_uri,
      scryfall_user_uri,
      image_uri,
      cmc,
      mana_cost,
    )
  }
}

export class Deck {
  constructor(
    public name: string,
    public cards: Card[],
  ){}
}

