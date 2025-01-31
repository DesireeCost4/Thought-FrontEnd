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

  userId: string = ''
  messages: any[] = []; 
  content: string = '';
  token = localStorage.getItem('auth_token');
  contacts: Contact[] = [];
  toUser: string = '';
  selectedContact: any = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log('Parâmetros recebidos:', params); 
      this.userId = params['userId'];
      console.log('UserId recebido da URL:', this.userId); 

      
    });
  }

  selectContact(contact: any) {
    this.selectedContact = contact;
    console.log('Contato selecionado:', this.selectedContact);
  }

  async sendMessage() {
    if (this.selectedContact && this.content.trim()) {
      const newMessage = {
        content: this.content,
        fromUser: this.userId,
        toUser: this.selectedContact.name,
        createdAt: new Date()
      };

      this.messages.push(newMessage);

      this.content = '';

      const token = localStorage.getItem('auth_token');
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); 
        const userId = decodedToken.userId;
        console.log('UserId autenticado:', userId);

        this.http.post(`http://localhost:3000/messages/${userId}`, newMessage, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .subscribe(
          (response) => {
            console.log('Mensagem enviada com sucesso', response);
            this.messages.push(response);  
          },
          (error) => console.error('Erro ao enviar mensagem', error)
        );
      }
    }
  }






  getMessages() {
    if (this.token && this.userId) {
      const headers = {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      };

      this.http.get<any[]>(`http://localhost:3000/messages/${this.userId, this.selectedContact}`, { headers })
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




interface Contact {
  name: string;
  photo: string;
  status: string;
}