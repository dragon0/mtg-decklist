import { Component, OnInit, Input } from '@angular/core';
import { Deck } from '../model/deck';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {

  @Input() deck!: Deck;

  constructor() { }

  ngOnInit(): void {
  }

}
