import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authProtectGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

  // Verifica se o usuário está logado
  if (!loggedInUser?.id) {
    router.navigate(['/login']); // Redireciona para login se não estiver logado
    return false;
  }

  // Verifica se a rota requer um administrador
  const requiresAdmin = route.data?.['requiresAdmin'];
  if (requiresAdmin && loggedInUser.role !== 'admin') {
    router.navigate(['/exibir']); // Redireciona se não for administrador
    return false;
  }

  return true;
};
