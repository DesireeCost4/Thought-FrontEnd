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
    email: '',
    password: '',
    confirmpassword: '',
  };

  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    console.log(this.user);

    if (this.user.password !== this.user.confirmpassword) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }

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
        }
      );
  }
}
