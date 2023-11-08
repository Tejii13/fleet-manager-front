import { TestBed } from '@angular/core/testing';

import { FetchOrganizationDataService } from './fetch-organization-data.service';

describe('FetchOrganizationDataService', () => {
  let service: FetchOrganizationDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchOrganizationDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
