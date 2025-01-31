import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,

  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  user = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  };

  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    console.log(this.user);


    if (!this.user.name || !this.user.username || !this.user.email || !this.user.password || !this.user.confirmpassword) {
      this.errorMessage = 'Todos os campos são obrigatórios.';
      return;
    }
    

    if (this.user.password !== this.user.confirmpassword) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
    if (!usernameRegex.test(this.user.username)) {
      this.errorMessage = 'O nome de usuário só pode conter letras, números, "_" ou "."';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.http
      .post('https://toughtapi.onrender.com/auth/register', this.user)
      .subscribe(
        (response) => {
          console.log('Cadastro realizado com sucesso!', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Erro ao cadastrar!', error);
          this.errorMessage = error.error ? error.error : 'Erro desconhecido';
          this.isLoading = false;
        }
      );
  }
}
