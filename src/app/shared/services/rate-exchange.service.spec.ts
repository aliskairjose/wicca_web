import { TestBed } from '@angular/core/testing';

import { RateExchangeService } from './rate-exchange.service';

describe('RateExchangeService', () => {
  let service: RateExchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RateExchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
