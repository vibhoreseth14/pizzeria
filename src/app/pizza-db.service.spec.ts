import { TestBed } from '@angular/core/testing';

import { PizzaDbService } from './pizza-db.service';

describe('PizzaDbService', () => {
  let service: PizzaDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PizzaDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
