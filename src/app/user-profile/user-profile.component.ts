import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any = {};  
  toughts: Array<any> = [];
  name: string = '';
  email: string = '';
  createdAt: string = '';

  constructor(
    private route: ActivatedRoute,  
    private ApiService: ApiService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');  
    console.log(username)

    
    
    if (username) {
      this.ApiService.getUserProfile(username).subscribe(
        (data) => {
          this.user =  Array.isArray(data) ? data[0] : data;
          
          
          console.log(this.user)
         

        },
        (error) => {
          console.error("Erro ao buscar perfil do usuário", error);
        }
      );
    }
  }

 

  
}


