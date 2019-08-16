import { TestBed } from '@angular/core/testing';

import { TimerObjectService } from './timer-object.service';

describe('TimerObjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimerObjectService = TestBed.get(TimerObjectService);
    expect(service).toBeTruthy();
  });
});
