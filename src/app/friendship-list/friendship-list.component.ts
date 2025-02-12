import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router'; 
import { ApiUsersService } from '../services/api-users.service';


@Component({
  selector: 'app-friendship-list',
  standalone: false,
  templateUrl: './friendship-list.component.html',
  styleUrls: ['./friendship-list.component.css']
})
export class FriendshipListComponent implements OnInit {
  friends: any[] = [];
  suggestions: any[] = [];
  errorMessage: string = '';
  username: string = ''
  searchQuery: string = '';
  users: any[] = [];
  userId: string = '';


  constructor(private http: HttpClient, private ApiService: ApiService, private router: Router, private ApiUsersService: ApiUsersService) { }

  ngOnInit(): void {
    this.userId = this.ApiService.getUserIdFromToken();
    console.log('UserId do token:', this.userId);
  
    if (!this.userId) {
      console.error('Erro: userId não encontrado no localStorage.');
      return;
    }
  
    this.loadSuggestions();
    this.loadFriends();

    
  }


  loadFriends() {
    if (!this.userId) {
      console.error('Erro: userId não encontrado.');
      return;
    }
  
    this.http.get<any>(`http://localhost:3000/users/friends/${this.userId}`).subscribe({
      next: (data) => {
        console.log('Usuário com amigos populados:', data);
  
        this.friends = [
          {
            userName: data.userName,
            friendsList: data.friendsList.map((friend: any) => friend.name),
          }
        ];
  
        console.log('Usuários e seus amigos:', this.friends);
      },
      error: (err) => {
        console.error('Erro ao buscar usuários:', err);
      }
    });
  }
  
  
    
  


  loadSuggestions(): void {
    this.http.get<any[]>('http://localhost:3000/users/')
      .subscribe(
        (response) => {
          this.suggestions = response;
        },
        (error) => {
          this.errorMessage = 'Erro ao carregar sugestões.';
        }
      );
  }

  searchUsers(): void {
    if (this.searchQuery.length > 0) {
      this.ApiService.searchUsers(this.searchQuery).subscribe((users: any[]) => {
        this.users = users;
        console.log('busca:',users)
      });
    } else {
      this.users = [];
    }
  }

  viewUserProfile(username: string): void {
    console.log('User name: ', username);
    this.router.navigate(['/profile', username]); 
  }
}
