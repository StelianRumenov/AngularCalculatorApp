import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent {
  private historyService = inject(HistoryService);
  private router = inject(Router);
  history$ = this.historyService.history$;

  clearHistory(): void {
    this.historyService.clearHistory();
  }

  goBack(): void {
    this.router.navigate(['/calculator']);
  }
}
