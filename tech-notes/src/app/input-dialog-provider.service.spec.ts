import { TestBed } from '@angular/core/testing';

import { InputDialogServiceService } from './input-dialog-provider.service';

describe('InputDialogProviderService', () => {
  let service: InputDialogServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputDialogServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
