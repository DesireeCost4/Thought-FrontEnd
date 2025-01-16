import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service'; // Certifique-se de ter um serviço API
import { ActivatedRoute } from '@angular/router';
import { Route } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: false,

  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  toughts: Array<any> = [];
  name: string = '';
  email: string = '';
  createdAt: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getDashboard();
  }

  getDashboard(): void {
    // Pega o token do localStorage
    const token = localStorage.getItem('auth_token'); // 'auth_token' é a chave que você usa para armazenar o token

    console.log('feed token: ' + token);

    if (token) {
      this.http
        .get<DashboardResponse>('http://localhost:3000/toughts/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
          },
        })
        .subscribe(
          (response) => {
            console.log('Dashboard:', response);
            this.toughts = response.toughts;
            this.name = response.name;
            (this.email = response.email),
              (this.createdAt = response.createdAt);
          },
          (error) => {
            console.error('Erro ao acessar a dashboard:', error); // Manipule o erro
          }
        );
    } else {
      console.log('Token não encontrado!');
    }
  }
}

// Definindo a interface dentro do mesmo arquivo
interface DashboardResponse {
  toughts: Array<any>;
  emptyToughts: boolean;
  name: string;
  email: string;
  createdAt: string;
}
