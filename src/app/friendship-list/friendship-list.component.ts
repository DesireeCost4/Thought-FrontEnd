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
  userId: string | null = null;


  constructor(private http: HttpClient, private ApiService: ApiService, private router: Router, private ApiUsersService: ApiUsersService) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    console.log(userId)
    this.loadSuggestions();
    this.loadFriends();

    
  }


  loadFriends() {
    
    if (!this.userId) {
      console.error('Erro: userId não encontrado no localStorage.');
      return;
    }


      this.ApiUsersService.getFriends(this.userId).subscribe({
        next: (data) => {
          console.log('Usuários com amigos populados: ', data);
          
          this.friends = data.map((user: any) => ({
            userName: user.name,
            friendsList: user.friends.map((friend: any) => friend.name) // Pega o nome dos amigos
          }));
          console.log('Usuários e seus amigos: ', this.friends);
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
