import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
 
  private apiUrl = 'http://localhost:3000/';

  private feedDataSubject = new BehaviorSubject<any[]>([]); 
  feedData$ = this.feedDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getUserIdFromToken(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); 
      return decodedToken.userId; 
    }
    return '';  
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  checkAuthentication(): boolean {
    const token = this.getToken();
    return token !== null && token !== '';
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  updateFeed(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.http
        .get<any[]>('http://localhost:3000/toughts/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .subscribe(
          (data) => {
            console.log('Feed atualizado com sucesso:', data);
            this.feedDataSubject.next(data);  
          },
          (error) => {
            console.error('Erro ao atualizar feed:', error);
          }
        );
    }}


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

  searchTought(search: string = '', order: string = 'desc'): Observable<any> {
    const token = localStorage.getItem('token'); // Obtém o token armazenado
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Define o cabeçalho Authorization
    const params = new HttpParams().set('search', search).set('order', order);

    return this.http.get(`http://localhost:3000/toughts`, { headers, params });
  }

 
  getToughtById(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/toughts/${id}`);
  }


  searchUsers(query: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/users/search?search=${query}`);
  }

  getUserProfile(username: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/users/search?search=${username}`);
  }

  
  removeFriend(username: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/friends/${username}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  


  


 
 
}
