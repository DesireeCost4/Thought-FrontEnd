import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://toughtapi.onrender.com/';

  private feedDataSubject = new BehaviorSubject<any[]>([]); // Inicializando com um array vazio
  feedData$ = this.feedDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  checkAuthentication(): boolean {
    const token = this.getToken();
    console.log('Token encontrado:', token);
    return token !== null && token !== '';
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  updateFeed() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.http
        .get<any[]>('https://toughtapi.onrender.com/toughts/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .subscribe(
          (data) => {
            this.feedDataSubject.next(data);
          },
          (error) => {
            console.error('Erro ao carregar feed:', error);
          }
        );
    }
  }

  login(data: any): Observable<any> {
    return this.http
      .post('https://toughtapi.onrender.com/auth/login', data)
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token);
          console.log('Token salvo:', response.token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    console.log('Token removido. Usuário deslogado.');
    window.location.href = '/login';
  }

  postNewtought(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/toughts/add', data).pipe(
      tap((response: any) => {
        localStorage.setItem('auth_token', response.token);
        console.log('Token salvo:', response.token);
      })
    );
  }

  removeTought(toughtId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}toughts/remove/${toughtId}`, {
      headers: this.getAuthHeaders(), // Chama o método que já gera os cabeçalhos com o token
    });
  }
}
