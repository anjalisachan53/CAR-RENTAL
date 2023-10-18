import { TestBed } from '@angular/core/testing';

import { DecryptserviceService } from './decryptservice.service';

describe('DecryptserviceService', () => {
  let service: DecryptserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecryptserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
