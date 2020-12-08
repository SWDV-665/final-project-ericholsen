import { TestBed } from '@angular/core/testing';

import { PasswordsProviderService } from './passwords-provider.service';

describe('PasswordsProviderService', () => {
  let service: PasswordsProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordsProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
