import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../modules/auth/services/auth.service';
import { inject } from '@angular/core';

export const authActivateGuard: CanActivateFn = (route, state) => {

  const auth: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  let verifyLog: boolean = false;

  auth.isLoged.subscribe({
    next: (isLogged: boolean) => {
      if (!isLogged) {
        router.navigate(['/auth/login'])
        verifyLog = false;
      } else {
        router.navigate(['/devs/home'])
        verifyLog = true;
      }
    }
  });

  return verifyLog;

};
