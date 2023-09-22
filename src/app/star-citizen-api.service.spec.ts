import { TestBed } from '@angular/core/testing';

import { StarCitizenApiService } from './star-citizen-api.service';

describe('StarCitizenApiService', () => {
  let service: StarCitizenApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarCitizenApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
