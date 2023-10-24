import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { catchError, map, of } from 'rxjs';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const storageService = inject(StorageService);
  const router = inject(Router);

  return authService.refreshToken().pipe(
    map(({ data }) => {
      const accessToken = data?.accessToken;
      if (accessToken) {
        storageService.setAccessToken(accessToken);
      }
      return true;
    }),
    catchError((err) => {
      console.log(err);

      router.navigate(['/login'], {
        queryParams: {
          accessDenied: true
        }
      });
      return of(false);
    })
  );
};

export const canActivateChild: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => AuthGuard(route, state);
