import { TestBed } from '@angular/core/testing';

import { AppiService } from './appi.service';

describe('AppiService', () => {
  let service: AppiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
