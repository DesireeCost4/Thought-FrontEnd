import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';

export const authGuard: CanActivateFn = (route, state) => {
  const apiService = inject(ApiService);
  const router = inject(Router);
  const token = apiService.getToken();
  console.log('authGuard token: ' + token)

  if (!token) {
    
    router.navigate(['/login']);
    console.log('token não encontrado: ')
    return false;
  }
  console.log('Token encontrado, permitindo acesso...');

  return true;
};
