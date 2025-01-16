import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: false,
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  constructor(private http: HttpClient, private router: Router) {}

  logout(): void {
    this.http
      .get('http://localhost:3000/auth/logout', { responseType: 'json' })
      .subscribe({
        next: (response) => {
          console.log('Resposta do backend:', response);
          localStorage.removeItem('token'); // Remover o token
          sessionStorage.removeItem('token'); // Remover o token da sessão

          this.router.navigate(['/login']); // Redireciona para o login usando o Router
        },
        error: (err) => {
          console.error('Erro ao fazer logout', err);
        },
      });
  }
}
