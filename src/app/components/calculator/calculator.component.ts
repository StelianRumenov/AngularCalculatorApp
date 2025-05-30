import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CalculatorService } from '../../services/calculator.service';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
  public calculatorService = inject(CalculatorService);
  constructor(private historyService: HistoryService, private router: Router) {}

  display$ = this.calculatorService.display$;

  @HostListener('window:keydown', ['$event'])
  handleKeyboardInput(event: KeyboardEvent): void {
    const key = event.key;

    if ((key >= '0' && key <= '9') || key === '.') {
      this.inputNumber(key);
    } else if (key === '+' || key === '-') {
      this.inputOperator(key);
    } else if (key === '*') {
      this.inputOperator('×');
    } else if (key === '/') {
      event.preventDefault();
      this.inputOperator('÷');
    } else if (key === 'Enter' || key === '=') {
      this.calculate();
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
      this.allClear();
    } else if (key === 'Backspace') {
      this.clearEntry();
    }
  }

  inputNumber(num: string): void {
    this.calculatorService.inputNumber(num);
  }

  inputOperator(operator: string): void {
    this.calculatorService.inputOperator(operator);
  }

  calculate(): void {
    const expression = this.calculatorService.performCalculation();
    if (expression) {
      const result = this.calculatorService.getCurrentDisplay();
      this.historyService.addCalculation(expression, result);
    }
  }

  clearEntry(): void {
    this.calculatorService.clearEntry();
  }

  allClear(): void {
    this.calculatorService.allClear();
  }

  memoryAdd(): void {
    this.calculatorService.memoryAdd();
  }

  memorySubtract(): void {
    this.calculatorService.memorySubtract();
  }

  memoryRecall(): void {
    this.calculatorService.memoryRecall();
  }

  memoryClear(): void {
    this.calculatorService.memoryClear();
  }

  goToHistory(): void {
    this.router.navigate(['/history']);
  }
}
