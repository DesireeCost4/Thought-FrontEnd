import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router'; 

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


  constructor(private http: HttpClient, private ApiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadFriends();
    this.loadSuggestions();
  }



  loadFriends(): void {
    this.http.get<any[]>('http://localhost:3000/users')
      .subscribe(
        (response) => {
          //this.friends = response;
          this.friends = response.filter(user => user.isFriend);
          console.log('friends: ',this.friends)
          
        },
        (error) => {
          this.errorMessage = 'Erro ao carregar amigos.';
        }
      );
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
