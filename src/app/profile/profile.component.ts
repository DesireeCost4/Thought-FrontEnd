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

  userId: string | null = null;
  


  toughts: Array<any> = [];
  name: string = '';
  email: string = '';
  createdAt: string = '';


  token: string | null = localStorage.getItem('token');
  

  constructor(private http: HttpClient) {}

 
  

  ngOnInit(): void {


   


    this.getDashboard();

    if (this.token) {
      console.log("Token:", this.token);
      const decodedToken = JSON.parse(atob(this.token.split('.')[1]));
      this.userId = decodedToken.userId; 

      console.log(this.userId);

    }
  }

  getDashboard(): void {
    const token = localStorage.getItem('auth_token');


    if (token) {
      
      this.http
        .get<DashboardResponse>(
          'http://localhost:3000/toughts/profile',
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
