import { Injectable } from '@angular/core';
import { Observable, from, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScryfallService } from './scryfall.service';
import { Deck, Card } from './model/deck';

const EXAMPLE_LIBRARY = [
  {
    name: "Arcane Tempo",
    cards: [
      "Goblin Electromancer",
      "Crackling Drake",
      "Murmuring Mystic",
      "Arclight Phoenix",
      "Niv-Mizzet, Parun",
      "Chart a Course",
      "Lava Coil",
      "Beacon Bolt",
      "Opt",
      "Radical Idea",
      "Shock",
      "Dive Down",
      "Blink of an Eye",
      "The Mirari Conjecture",
      "Sulfur Falls",
      "Izzet Guildgate",
      "Island",
      "Mountain",
      "The Mirari Conjecture",
      "Beacon Bolt",
      "Negate",
      "Entrancing Melody",
      "Fiery Cannonade",
      "Shivan Fire",
      "Disdainful Stroke",
    ]
  },
  {
    name: "Vehicle Rush",
    cards: [
      "Bomat Courier",
      "Toolcraft Exemplar",
      "Scrapheap Scrounger",
      "Pia Nalaar",
      "Depala, Pilot Exemplar",
      "Veteran Motorist",
      "Unlicensed Disintegration",
      "Lightning Strike",
      "Heart of Kiran",
      "Cultivator's Caravan",
      "Skysovereign, Consul Flagship",
      "Spire of Industry",
      "Dragonskull Summit",
      "Concealed Courtyard",
      "Aether Hub",
      "Unclaimed Territory",
      "Evolving Wilds",
      "Plains",
      "Mountain",
      "Swamp",
      "Aethersphere Harvester",
      "Inspiring Vantage",
      "Aethersphere Harvester",
      "Harsh Mentor",
      "Crook of Condemnation",
      "Duress",
      "Chandra's Defeat",
      "Magma Spray",
      "Cast Out",
    ]
  },
  {
    name: "Blessed",
    cards: [
      "Cathedral Sanctifier",
      "Champion of the Parish",
      "Doomed Traveler",
      "Nephalia Smuggler",
      "Moorland Inquisitor",
      "Thraben Heretic",
      "Elder Cathar",
      "Village Bell-Ringer",
      "Captain of the Mists",
      "Tandem Lookout",
      "Chapel Geist",
      "Emancipation Angel",
      "Fiend Hunter",
      "Geist of Saint Traft",
      "Slayer of the Wicked",
      "Tower Geist",
      "Mist Raven",
      "Spectral Gateguards",
      "Gryff Vanguard",
      "Dearly Departed",
      "Goldnight Redeemer",
      "Voice of the Provinces",
      "Topplegeist",
      "Gather the Townsfolk",
      "Increasing Devotion",
      "Pore Over the Pages",
      "Momentary Blink",
      "Rebuke",
      "Eerie Interlude",
      "Sharpened Pitchfork",
      "Butcher's Cleaver",
      "Bonds of Faith",
      "Seraph Sanctuary",
      "Tranquil Cove",
      "Plains",
      "Island",
    ],
  },
  {
    name: "Cursed",
    cards: [
      "Diregraf Ghoul",
      "Gravecrawler",
      "Butcher Ghoul",
      "Screeching Skaab",
      "Unbreathing Horde",
      "Scrapskin Drake",
      "Ghoulraiser",
      "Stitched Drake",
      "Diregraf Captain",
      "Abattoir Ghoul",
      "Driver of the Dead",
      "Falkenrath Noble",
      "Makeshift Mauler",
      "Havengul Runebinder",
      "Relentless Skaabs",
      "Harvester of Souls",
      "Tooth Collector",
      "Mindwrack Demon",
      "Appetite for Brains",
      "Sever the Bloodline",
      "Barter in Blood",
      "Dread Return",
      "Moan of the Unhallowed",
      "Human Frailty",
      "Victim of Night",
      "Tribute to Hunger",
      "Forbidden Alchemy",
      "Compelling Deterrence",
      "Cobbled Wings",
      "Dismal Backwater",
      "Swamp",
      "Island",
    ],
  },
]

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private scryfall: ScryfallService) { }

  getLibrary(): Deck[] {
    let library_str = localStorage.getItem('library');
    let library = library_str === null?
       []:
       JSON.parse(library_str);
    return library;
  }

  saveLibrary(library: Deck[]): void {
    localStorage.setItem('library', JSON.stringify(library));
  }

  loadExampleLibrary(): Observable<Deck[]> {
    return forkJoin(
      EXAMPLE_LIBRARY.map((protodeck) => {
        return this.scryfall.getCollection(protodeck.cards)
            .pipe(map((cards) => new Deck(protodeck.name, cards)));
      })).pipe(map((library) => {
        this.saveLibrary(library);
        return library
      }));
  }
}
