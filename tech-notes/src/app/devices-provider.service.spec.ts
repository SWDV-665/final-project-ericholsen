import { TestBed } from '@angular/core/testing';

import { DevicesProviderService } from './devices-provider.service';

describe('DevicesProviderService', () => {
  let service: DevicesProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevicesProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
