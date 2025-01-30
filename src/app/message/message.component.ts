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

  userId: string = 'lucas'

  messages: any[] = []; 
  content: string = '';
  token = localStorage.getItem('auth_token');
  //contacts: Contact[] = [];
  toUser: string = '';
  selectedContact: any = null;

  contacts = [
    {
      name: 'Lucas Silva',
      status: 'Online',
      photo: 'https://www.example.com/photos/lucas.jpg'
    },
    {
      name: 'Maria Oliveira',
      status: 'Offline',
      photo: 'https://www.example.com/photos/maria.jpg'
    },
    {
      name: 'João Souza',
      status: 'Em conversa',
      photo: 'https://www.example.com/photos/joao.jpg'
    }
  ];

  


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

  // Função para enviar a mensagem
  async sendMessage() {
    if (this.selectedContact && this.content.trim()) {
      const newMessage = {
        content: this.content,
        fromUser: this.userId,
        toUser: this.selectedContact.name,
        createdAt: new Date()
      };

      // Salva a mensagem localmente
      this.messages.push(newMessage);

      // Limpa o campo de mensagem
      this.content = '';

      // Obtém o token do localStorage
      const token = localStorage.getItem('auth_token');
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodifica o JWT
        const userId = decodedToken.userId;
        console.log('UserId autenticado:', userId);

        // Envia a mensagem para o backend
        this.http.post(`http://localhost:3000/messages/${userId}`, newMessage, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .subscribe(
          (response) => {
            console.log('Mensagem enviada com sucesso', response);
            this.messages.push(response);  // Adiciona a nova mensagem do servidor
          },
          (error) => console.error('Erro ao enviar mensagem', error)
        );
      }
    }
  }






  // Função para buscar as mensagens
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