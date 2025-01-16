import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const loginData = { email: this.email, password: this.password };

    this.apiService.login(loginData).subscribe(
      (response) => {
        console.log('Login bem-sucedido', response);

        localStorage.setItem('auth_token', response.token);

        this.router.navigate(['/feed']);
      },
      (error) => {
        console.error('Erro no login', error);
        alert('Credenciais inválidas!');
      }
    );
  }
}
