import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiUsersService {

  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  getPendingRequests(userId: string): Observable<any> {
    console.log('URL chamada:', `${this.apiUrl}/users/pending-requests/${userId}`);  // Verifique a URL
    return this.http.get(`${this.apiUrl}/users/pending-requests/${userId}`);
  }

  acceptFriendRequest(body: { requestId: string; userId: string }, headers: HttpHeaders): Observable<any> {
    const url = `${this.apiUrl}/users/accept-friend-request`; 
    return this.http.post<any>(url, body, { headers });
  }



  getFriends(userId: string ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`  
    });
  
    console.log(userId)
    return this.http.get<any>(`${this.apiUrl}/users/friends/${userId}`, { headers });
  }
  

}
