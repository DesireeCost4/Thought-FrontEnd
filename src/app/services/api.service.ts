import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/';

  private feedDataSubject = new BehaviorSubject<any[]>([]); // Inicializando com um array vazio
  feedData$ = this.feedDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  checkAuthentication(): boolean {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return false;
    }
    return true;
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
        .get<any[]>('http://localhost:3000/toughts/dashboard', {
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
      .post('https://toughts-mongoose.onrender.com/login', data)
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token);
          console.log('Token salvo:', response.token); // Log para verificar o token salvo
        })
      );
  }

  postNewtought(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/toughts/add', data).pipe(
      tap((response: any) => {
        localStorage.setItem('auth_token', response.token);
        console.log('Token salvo:', response.token); // Log para verificar o token salvo
      })
    );
  }

  removeTought(toughtId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}toughts/remove/${toughtId}`, {
      headers: this.getAuthHeaders(), // Chama o método que já gera os cabeçalhos com o token
    });
  }
}
