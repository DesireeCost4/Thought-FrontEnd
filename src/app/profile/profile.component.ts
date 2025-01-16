import { Component } from '@angular/core';
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
    const token = localStorage.getItem('auth_token');

    console.log('feed token: ' + token);

    if (token) {
      this.http
        .get<DashboardResponse>(
          'https://toughtapi.onrender.com/toughts/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
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

interface DashboardResponse {
  toughts: Array<any>;
  emptyToughts: boolean;
  name: string;
  email: string;
  createdAt: string;
}
