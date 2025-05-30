import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Calculation } from '../models/calculation.model';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private historySubject = new BehaviorSubject<Calculation[]>([]);
  history$ = this.historySubject.asObservable();

  addCalculation(expression: string, result: string) {
    const calculation: Calculation = {
      id: Date.now().toString(),
      expression,
      result,
      timestamp: new Date(),
    };

    const currentHistory = this.historySubject.value;
    this.historySubject.next([calculation, ...currentHistory]);
  }

  clearHistory(): void {
    this.historySubject.next([]);
  }

  getHistory(): Calculation[] {
    return this.historySubject.value;
  }
}
