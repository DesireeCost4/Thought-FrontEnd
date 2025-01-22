import { Component } from '@angular/core';
import { faHome, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Thoughts-Sights';
  faHome = faHome;
  faHeart = faHeart;
}
