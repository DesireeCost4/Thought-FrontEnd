import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-message',
  standalone: false,
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})


export class MessageComponent implements OnInit {

  
  userId: string | undefined;
  messages: any[] = []; 
  toUser: string = '';  
  content: string = '';
  token = localStorage.getItem('auth_token');

  newMessage = {
    toUser: this.toUser,
    content: this.content}



  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log('Parâmetros recebidos:', params); 
      this.userId = params['userId'];
      console.log('UserId recebido da URL:', this.userId); 

      if (this.userId) {
        this.getMessages(); 
      }
    });
  }

  async sendMessage() {

    const token = localStorage.getItem('auth_token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodifica o JWT
      const userId = decodedToken.userId;
      console.log(userId)
    
      const message = {
        toUser: this.toUser,
      content: this.content
      };
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      
    console.log('Dados da mensagem:', message);

    console.log(token)

    this.http.post(`http://localhost:3000/messages/${userId}`, message, { 
    headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }})
    .subscribe(
      
      (response) => {console.log('Mensagem enviada', response)
        this.content=''
        this.toUser=''
      },
      
      error => console.error('Erro ao enviar mensagem', error)
      
    );
    }
}

getMessages() {
  if (this.token && this.userId) {
    const headers = {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    };

    this.http.get<any[]>(`http://localhost:3000/messages/${this.userId}`, { headers })
      .subscribe(
        (response) => {
          console.log('Mensagens recebidas:', response);
          this.messages = response; 
        },
        (error) => {
          console.error('Erro ao buscar mensagens:', error);
        }
      );
  }
}

}
