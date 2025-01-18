import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-asidebar-left',
  standalone: false,

  templateUrl: './asidebar-left.component.html',
  styleUrl: './asidebar-left.component.css',
})
export class AsidebarLeftComponent {
  name: string = '';
  email: string = '';
  createdAt: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getDashboard();
  }

  getDashboard(): void {
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
  name: string;
  email: string;
  createdAt: string;
}
