import { Component, OnInit } from '@angular/core';
import { ApiUsersService } from '../services/api-users.service';
import { ApiService } from '../services/api.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-request-friend',
  standalone: false,
  
  templateUrl: './request-friend.component.html',
  styleUrl: './request-friend.component.css'
})
export class RequestFriendComponent implements OnInit{

  showRequests = false;
  pendingRequests: any[] = [];
  userId: string = '';



 

 

  constructor(private ApiUsersService: ApiUsersService, private ApiService: ApiService) {}

  ngOnInit(): void {

    this.userId = this.ApiService.getUserIdFromToken();
    console.log('UserId do token:', this.userId);

    


    this.ApiUsersService.getPendingRequests(this.userId).subscribe(
      (response) => {
        console.log('Response da API:', response);
          this.pendingRequests = response.pendingRequests;
         
      },
      (error) => {
        console.error('Erro ao buscar solicitações pendentes:', error);
      }
    );
  }

  toggleRequests() {
    console.log('Alternando showRequests:', this.showRequests);  

    this.showRequests = !this.showRequests;
  }

  acceptRequest(requestId: string): void {
    const body = {
      requestId: requestId, 
      userId: this.userId
    };


    console.log('requestUserID:' , requestId)
    console.log('USERID:' ,this.userId)

   
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.ApiUsersService.acceptFriendRequest(body, headers).subscribe(
      (response) => {
        console.log('Resposta ao aceitar solicitação:', response);
        this.pendingRequests = this.pendingRequests.filter(request => request._id !== requestId);
      },
      (error) => {
        console.error('Erro ao aceitar a solicitação:', error);
      }
    );
  }
}
  



