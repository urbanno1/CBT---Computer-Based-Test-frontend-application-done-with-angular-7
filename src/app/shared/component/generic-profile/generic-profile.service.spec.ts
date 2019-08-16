import { TestBed } from '@angular/core/testing';

import { GenericProfileService } from './generic-profile.service';

describe('GenericProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenericProfileService = TestBed.get(GenericProfileService);
    expect(service).toBeTruthy();
  });
});
