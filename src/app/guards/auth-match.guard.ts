import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../modules/auth/services/auth.service';
import { inject } from '@angular/core';

export const authMatchGuard: CanMatchFn = (route, segments) => {

  const auth: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  let verifyLog: boolean = false;

  auth.isLoged.subscribe({
    next: (isLogged: boolean) => {
      if (!isLogged) {
        router.navigate(['/auth/login'])
        verifyLog = false;
      } else {
        verifyLog = true;
      }
    }
  });

  return verifyLog;
  
};
