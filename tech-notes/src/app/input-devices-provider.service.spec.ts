import { TestBed } from '@angular/core/testing';

import { InputDevicesProviderService } from './input-devices-provider.service';

describe('InputDevicesProviderService', () => {
  let service: InputDevicesProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputDevicesProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
