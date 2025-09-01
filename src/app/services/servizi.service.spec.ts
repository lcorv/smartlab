import { TestBed } from '@angular/core/testing';

import { ServiziService } from './servizi.service';

describe('ServiziService', () => {
  let service: ServiziService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiziService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
