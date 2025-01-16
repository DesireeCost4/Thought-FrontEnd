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
      .get('https://toughtapi.onrender.com/auth/logout', {
        responseType: 'json',
      })
      .subscribe({
        next: (response) => {
          console.log('Resposta do backend:', response);
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');

          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Erro ao fazer logout', err);
        },
      });
  }
}
