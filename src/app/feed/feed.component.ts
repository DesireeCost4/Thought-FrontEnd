import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfileComponent } from '../profile/profile.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-feed',
  standalone: false,

  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent implements OnInit {
  toughts: Array<any> = [];
  allToughts: Array<any> = [];
  dropdownOpen: string | null = null;
  selectedToughtId: string | null = null;
  title: string = '';
  name: string = '';
  email: string = '';
  createdAt: string = '';

  private feedDataSubject = new BehaviorSubject<any[]>([]);
  feedData$ = this.feedDataSubject.asObservable();
  feedData: any[] = [];

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getDashboard();
    this.apiService.feedData$.subscribe((data) => {
      this.feedData = data;
      this.cdr.detectChanges();
    });
    this.apiService.updateFeed();
  }

  getDashboard(): void {
    const token = localStorage.getItem('auth_token');

    console.log('feed token: ' + token);

    if (token) {
      this.http
        .get<DashboardResponse>(
          'https://toughtapi.onrender.com/toughts/dashboard',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .subscribe(
          (response) => {
            console.log('Dashboard:', response);
            this.toughts = response.toughts;
            this.allToughts = response.allToughts;
            this.name = response.name;
            this.email = response.email;
            this.createdAt = response.createdAt;

            this.cdr.detectChanges();
          },

          (error) => {
            console.error('Erro ao acessar a dashboard:', error);
          }
        );
    } else {
      console.log('Token não encontrado!');
    }
  }

  toggleDropdown(toughtId: string): void {
    this.dropdownOpen = this.dropdownOpen === toughtId ? null : toughtId;
  }

  editTought(tought: any): void {
    console.log('Editar pensamento:', tought);
  }

  removeTought(id: string) {
    console.log('Tentando deletar pensamento com ID:', id);

    this.http
      .delete(`https://toughtapi.onrender.com/toughts/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .subscribe(
        (response) => {
          console.log('Pensamento deletado com sucesso:', response);
          this.getDashboard();
        },
        (error) => {
          console.error('Erro ao remover pensamento', error);
        }
      );
  }
}

interface DashboardResponse {
  toughts: Array<any>;
  allToughts: Array<any>;
  emptyToughts: boolean;
  name: string;
  email: string;
  createdAt: string;
}
