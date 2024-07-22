import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isEmployeeGuard } from './is-employee.guard';

describe('isEmployeeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => isEmployeeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
