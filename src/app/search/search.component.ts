import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search',
  standalone: false,

  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  toughts: any[] = [];
  searchQuery: string = '';
  toughtsQty: number = 0;

  constructor(private ApiService: ApiService) {}

  ngOnInit(): void {
    this.fetchToughts();
  }

  fetchToughts(): void {
    if (this.searchQuery.trim() === '') {
      this.toughts = [];
      this.toughtsQty = 0;
      return;
    }

    this.ApiService.searchTought(this.searchQuery).subscribe({
      next: (response: { toughts: any[]; toughtsQty: number }) => {
        this.toughts = response.toughts;
        this.toughtsQty = response.toughtsQty;
      },
      error: (error: any) => {
        console.error('Erro ao buscar pensamentos:', error);
      },
    });
  }

  onSearchInputChange(): void {
    this.fetchToughts();
  }
}
