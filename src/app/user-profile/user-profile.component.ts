import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any = {};  
  userId:string='';
  isFriend: boolean = false;
  toughts: Array<any> = [];
  name: string = '';
  email: string = '';
  createdAt: string = '';

  constructor(
    private route: ActivatedRoute,  
    private ApiService: ApiService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    

    const username = this.route.snapshot.paramMap.get('username');  
    

    
    if (username) {
      this.ApiService.getUserProfile(username).subscribe(
        
        (data) => {
          
          this.user =  Array.isArray(data) ? data[0] : data;
          
          
          console.log(this.user)

          this.toughts = this.user?.toughts ? [...this.user.toughts] : [];
      
          console.log('Toughts:', this.toughts);

          this.toughts.forEach(()=>{
            this.getToughtById(username);
          })
         

        },
        (error) => {
          console.error("Erro ao buscar perfil do usuário", error);
        }
      );
    }
  }


 
  getToughtById(username:string): void {

    console.log(username)

    const token = localStorage.getItem('token'); 
    console.log(token)
  if (!token) {
    console.error('Token não encontrado');
    return;
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>(`http://localhost:3000/toughts/profile/${username}`, {headers}).subscribe(
      (response) => {
       console.log('teste',this.user)
        this.toughts = response.toughts
        console.log('RESPONSE.TOUGHT',response.toughts)
        
      },
      (error) => {
        console.error("Erro ao buscar tought", error);
      }
    );
  }


  
  addFriend(): void {

    const friendId = this.user._id;

    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = this.decodeToken(token); 

    const userId = decodedToken.userId;
    
   
    this.http.post<any>(`http://localhost:3000/users/add/${friendId}`, {userId}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }).subscribe({
      next: (response) => {
        console.log( 'debug')
        console.log('Amigo adicionado com sucesso!', response);
        alert('Amigo adicionado com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao adicionar amigo', error);
        alert('Erro ao adicionar amigo');
      }
  
  
    });
  }

}


  decodeToken(token: string): any {
    const payload = token.split('.')[1]; 
    const decoded = atob(payload); 
    return JSON.parse(decoded); 
  }

 
}



  



