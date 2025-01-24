import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  selector: 'app-profile',
  standalone: false,

  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  faHome = faHome;
  faHeart = faHeart;
  faCommentAlt: IconDefinition = faCommentAlt;
  faUser = faUser;
  faComment = faComment;
  faSignOutAlt = faSignOutAlt;

  toughts: Array<any> = [];
  name: string = '';
  email: string = '';
  createdAt: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getDashboard();
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
            console.log('Dashboard:', response);
            this.toughts = response.toughts;
            this.name = response.name;
            (this.email = response.email),
              (this.createdAt = response.createdAt);
          },
          (error) => {
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
