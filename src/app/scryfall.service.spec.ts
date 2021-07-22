import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

import { ScryfallService } from './scryfall.service';

describe('ScryfallService', () => {
  let service: ScryfallService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ScryfallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve Grenzo', (done) => {
    service.getNamedCard('Grenzo, Dungeon Warden').subscribe((card) => {
      expect(card.name).toEqual('Grenzo, Dungeon Warden');
      done();
    })
  });

  it('should retrieve some cards', (done) => {
    let cards = [
      "Crackling Drake",
      "Niv-Mizzet, Parun",
      "Opt",
      "Izzet Guildgate",
      "Bomat Courier",
      "Duress",
    ];
    service.getCollection(cards).subscribe((cards) => {
      expect(cards.length).toEqual(6);
      done();
    })
  });
});
