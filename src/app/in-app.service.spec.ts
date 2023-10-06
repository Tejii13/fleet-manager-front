import { TestBed } from '@angular/core/testing';

import { InAppService } from './in-app.service';

describe('InAppService', () => {
  let service: InAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
