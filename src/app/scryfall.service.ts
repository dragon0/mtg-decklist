import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Card, LandCard, InstantCard, SorceryCard, ArtifactCard, CreatureCard, PlaneswalkerCard, Deck } from './model/deck';

const API_ROOT = 'https://api.scryfall.com';

interface ImageURIs {
  small: string;
  normal: string;
  large: string;
  png: string;
  art_crop: string;
  border_crop: string;
}

interface ScryfallCard {
  id: string;
  oracle_id: string;
  name: string;
  uri: string;
  scryfall_uri: string;
  image_uris?: ImageURIs;
  mana_cost?: string;
  cmc: number;
  type_line: string;
  oracle_text?: string;
  power?: string;
  toughness?: string;
  loyalty?: string;
}

interface CardList {
  data: ScryfallCard[];
  total_cards: number;
}

interface CardIdentifier {
  name: string;
}

interface CardCollectionQuery {
  identifiers: CardIdentifier[];
}

@Injectable({
  providedIn: 'root'
})
export class ScryfallService {

  constructor(private http: HttpClient) { }

  getNamedCard(cardName: string): Observable<Card> {
    return this.http.get<ScryfallCard>(`${API_ROOT}/cards/named?exact=${encodeURIComponent(cardName)}`)
            .pipe(map((card) => this.cardFromScryfall(card)))
  }

  queryString(q: string): Observable<Card[]> {
    return this.http.get<CardList>(`${API_ROOT}/cards/search?q=${encodeURIComponent(q)}`)
            .pipe(map((cardList) => cardList.data.map((card) => this.cardFromScryfall(card))));
  }

  getCollection(cardNames: string[]): Observable<Card[]> {
    let identifiers = cardNames.map((name) => {return {name}});
    let query: CardCollectionQuery = {identifiers};
    return this.http.post<CardList>(`${API_ROOT}/cards/collection`, query)
            .pipe(map((cardList) => cardList.data.map((card) => this.cardFromScryfall(card))));
  }

  private cardFromScryfall(scryfallCard: ScryfallCard): Card {
    let type = this.determineType(scryfallCard);
    let card;
    switch(type){
        case 'creature':
          card = new CreatureCard(
            scryfallCard.name,
            scryfallCard.type_line,
            scryfallCard.oracle_text!,
            scryfallCard.uri,
            scryfallCard.scryfall_uri,
            scryfallCard.image_uris!.normal,
            scryfallCard.cmc,
            scryfallCard.mana_cost!,
            scryfallCard.power!,
            scryfallCard.toughness!,
        );
        break;
        case 'land': card = new LandCard(
            scryfallCard.name,
            scryfallCard.type_line,
            scryfallCard.oracle_text!,
            scryfallCard.uri,
            scryfallCard.scryfall_uri,
            scryfallCard.image_uris!.normal,
        ); break;
        case 'instant': card = new InstantCard(
            scryfallCard.name,
            scryfallCard.type_line,
            scryfallCard.oracle_text!,
            scryfallCard.uri,
            scryfallCard.scryfall_uri,
            scryfallCard.image_uris!.normal,
            scryfallCard.cmc,
            scryfallCard.mana_cost!,
        ); break;
        case 'sorcery': card = new SorceryCard(
            scryfallCard.name,
            scryfallCard.type_line,
            scryfallCard.oracle_text!,
            scryfallCard.uri,
            scryfallCard.scryfall_uri,
            scryfallCard.image_uris!.normal,
            scryfallCard.cmc,
            scryfallCard.mana_cost!,
        ); break;
        case 'artifact': card = new ArtifactCard(
            scryfallCard.name,
            scryfallCard.type_line,
            scryfallCard.oracle_text!,
            scryfallCard.uri,
            scryfallCard.scryfall_uri,
            scryfallCard.image_uris!.normal,
            scryfallCard.cmc,
            scryfallCard.mana_cost!,
        ); break;
        case 'planeswalker': card = new PlaneswalkerCard(
            scryfallCard.name,
            scryfallCard.type_line,
            scryfallCard.oracle_text!,
            scryfallCard.uri,
            scryfallCard.scryfall_uri,
            scryfallCard.image_uris!.normal,
            scryfallCard.cmc,
            scryfallCard.mana_cost!,
            scryfallCard.loyalty!,
        ); break;
    }

    return card;
  }

  private determineType(card: ScryfallCard): 'land' | 'instant' | 'sorcery' | 'artifact' | 'creature' | 'planeswalker' {

    let types = card.type_line.split(/ +/);

    //FIXME Is there a better way to do this?
    for (let type of types) {
      type = type.toLowerCase();
      switch(type) {
        case 'creature': return 'creature';
        case 'land': return 'land';
        case 'instant': return 'instant';
        case 'sorcery': return 'sorcery';
        case 'artifact': return 'artifact';
        case 'planeswalker': return 'planeswalker';
        default: continue;
      }
    }

    throw `Could not determine type in "${card.type_line}"`;

  }
}
