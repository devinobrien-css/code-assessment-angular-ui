import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loggedOutGuardGuard } from './logged-out-guard.guard';

describe('loggedOutGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loggedOutGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
