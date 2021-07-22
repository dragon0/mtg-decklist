import { Component, OnInit, Input } from '@angular/core';

import { Deck } from '../model/deck';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  @Input() deck!: Deck;

  constructor() { }

  ngOnInit(): void {
  }

}
