import { TestBed } from '@angular/core/testing';

import { OperatoriService } from './operatori.service';

describe('OperatoriService', () => {
  let service: OperatoriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperatoriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
