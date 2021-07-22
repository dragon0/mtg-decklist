import { Component, OnInit, Input } from '@angular/core';

import { Deck } from '../model/deck';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.scss']
})
export class DeckListComponent implements OnInit {

  @Input() decks: Deck[] = [];

  constructor(private library: LibraryService){}

  ngOnInit() {
    this.decks = this.library.getLibrary();
  }

  loadExampleLibrary() {
    this.library.loadExampleLibrary().subscribe(decks => this.decks = decks);
  }

}
