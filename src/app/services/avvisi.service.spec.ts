import { TestBed } from '@angular/core/testing';

import { AvvisiService } from './avvisi.service';

describe('AvvisiService', () => {
  let service: AvvisiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvvisiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
