import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';

@Component({
  selector: 'app-input-post',
  standalone: false,

  templateUrl: './input-post.component.html',
  styleUrl: './input-post.component.css',
})
export class InputPostComponent {
  postData = { title: '', userId: '' };

  constructor(private http: HttpClient, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getNewTought();
  }

  getNewTought() {
    const token = localStorage.getItem('auth_token');

    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodifica o JWT
      const userId = decodedToken.userId;

      const postData = {
        title: this.postData.title,
        userId: userId,
      };

      this.http
        .post<any>('https://toughtapi.onrender.com/toughts/add', postData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .subscribe(
          (response) => {
            console.log('Pensamento criado com sucesso:', response);
            console.log(postData);
          },
          (error) => {
            console.error('Erro ao criar pensamento:', error);
          }
        );
    }
  }
}

interface OnPost {}
