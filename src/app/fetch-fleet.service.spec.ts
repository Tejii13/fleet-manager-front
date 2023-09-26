import { TestBed } from '@angular/core/testing';

import { FetchFleetService } from './fetch-fleet.service';

describe('FetchFleetService', () => {
  let service: FetchFleetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchFleetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
