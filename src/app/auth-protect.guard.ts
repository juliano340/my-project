import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authProtectGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

  if (!loggedInUser?.id) {
    router.navigate(['/login']);
    return false;
  }

  const requiresAdmin = route.data?.['requiresAdmin'];
  if (requiresAdmin && loggedInUser.role !== 'admin') {
    router.navigate(['/exibir']);
    return false;
  }

  return true;
};
