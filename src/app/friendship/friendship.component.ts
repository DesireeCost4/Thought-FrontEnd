import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-friendship',
  imports: [CommonModule],
  templateUrl: './friendship.component.html',
  styleUrls: ['./friendship.component.css']
})
export class FriendshipComponent implements OnInit {

  username: string = ''; 
  isFriend: boolean = false; 
  errorMessage: string = ''; 
  successMessage: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username') || ''; 
    
    if (this.username) {
      this.checkFriendStatus();
    } else {
      this.errorMessage = 'Usuário não encontrado!';
    }
  }

  checkFriendStatus() {
    this.http.get(`https://your-backend-api-url/is-friend/${this.username}`).subscribe(
      (response: any) => {
        this.isFriend = response.isFriend;
      },
      (error) => {
        this.errorMessage = 'Erro ao verificar amizade.';
      }
    );
  }

  addOrRemoveFriend() {
    if (!this.username) {
      this.errorMessage = 'Digite um nome de usuário.';
      return;
    }

    if (this.isFriend) {
      this.removeFriend();
    } else {
      this.addFriend();
    }
  }

  addFriend() {
    this.http.post(`https://your-backend-api-url/add-friend/${this.username}`, {}).subscribe(
      (response: any) => {
        this.successMessage = 'Solicitação de amizade enviada com sucesso!';
        this.isFriend = false; 
      },
      (error) => {
        this.errorMessage = 'Erro ao enviar solicitação de amizade.';
      }
    );
  }

 
  removeFriend() {
    this.http.post(`https://your-backend-api-url/remove-friend/${this.username}`, {}).subscribe(
      (response: any) => {
        this.successMessage = 'Amigo removido com sucesso!';
        this.isFriend = false;  
      },
      (error) => {
        this.errorMessage = 'Erro ao remover o amigo.';
      }
    );
  }
}
