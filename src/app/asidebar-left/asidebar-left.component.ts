import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


import {
  faUser,
  faComment,
  faSignOutAlt,
  faCommentAlt,
  faHome,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';

import { IconDefinition } from '@fortawesome/fontawesome-common-types';

@Component({
  selector: 'app-asidebar-left',
  standalone: false,

  templateUrl: './asidebar-left.component.html',
  styleUrl: './asidebar-left.component.css',
})
export class AsidebarLeftComponent implements OnInit {

  userId: string | undefined;
  //icons
  faHome = faHome;
  faHeart = faHeart;
  faCommentAlt: IconDefinition = faCommentAlt;
  faUser = faUser;
  faComment = faComment;
  faSignOutAlt = faSignOutAlt;

  //lógica
  name: string = '';
  email: string = '';
  createdAt: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getDashboard();
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        this.userId = decodedToken.userId;
        console.log('userId:', this.userId);
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    } else {
      console.warn('Token não encontrado');
    }
  }
  



  getDashboard(): void {
    const token = localStorage.getItem('auth_token');


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

            this.name = response.name;
            (this.email = response.email),
              (this.createdAt = response.createdAt);
          },
          (error) => {
            console.error('Erro ao acessar a dashboard:', error); 
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
