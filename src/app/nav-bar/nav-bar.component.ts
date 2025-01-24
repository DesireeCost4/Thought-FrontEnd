import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-nav-bar',
  standalone: false,

  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('200ms ease-in', style({ opacity: 1 }))]),
      transition(':leave', [animate('200ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class NavBarComponent {
  constructor(private apiService: ApiService) {}

  isLoggedIn: boolean = false;

  ngOnInit() {
    this.isLoggedIn = this.apiService.checkAuthentication(); 
  }
}
