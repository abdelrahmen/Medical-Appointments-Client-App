import { CanActivateFn } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isLoggedIn();
};
