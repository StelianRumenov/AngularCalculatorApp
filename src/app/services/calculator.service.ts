import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private displaySubject = new BehaviorSubject('0');
  private currentNumber = '';
  private previousNumber = '';
  private operator = '';
  private waitingForOperand = false;
  private memory = 0;

  display$ = this.displaySubject.asObservable();

  inputNumber(num: string): void {
    if (this.waitingForOperand) {
      this.currentNumber = num;
      this.waitingForOperand = false;
    } else {
      if (num === '.' && this.currentNumber.includes('.')) {
        return; //prevent multiple decimal points
      }

      this.currentNumber =
        this.currentNumber === '0' && num !== '.'
          ? num
          : this.currentNumber + num;
    }

    this.updateDisplay(this.currentNumber);
  }

  inputOperator(nextOperator: string): void {
    const inputValue = parseFloat(this.currentNumber);

    if (this.previousNumber === '') {
      this.previousNumber = this.currentNumber;
    } else if (this.operator && !this.waitingForOperand) {
      const currentValue = parseFloat(this.previousNumber);
      const newValue = this.calculate(currentValue, inputValue, this.operator);
      this.previousNumber = String(newValue); // 🔧 Store result as new previousNumber
      this.updateDisplay(this.previousNumber); // 🔧 Optional: update display to show intermediate result
    }

    this.operator = nextOperator; // ✅ Store the new operator
    this.waitingForOperand = true;
  }

  performCalculation(): string {
    const prev = parseFloat(this.previousNumber);
    const current = parseFloat(this.currentNumber);

    if (this.operator && !this.waitingForOperand) {
      const result = this.calculate(prev, current, this.operator);

      if (result === null) {
        this.allClear();
        return 'Error';
      }

      const expression = `${this.previousNumber} ${this.operator} ${this.currentNumber}`;
      this.currentNumber = String(result);
      this.previousNumber = '';
      this.operator = '';
      this.waitingForOperand = true;
      this.updateDisplay(this.currentNumber);

      return expression;
    }

    return '';
  }

  clearEntry(): void {
    this.currentNumber = '';
    this.updateDisplay(this.currentNumber);
  }

  allClear(): void {
    this.currentNumber = '0';
    this.previousNumber = '';
    this.operator = '';
    this.waitingForOperand = false;
    this.updateDisplay(this.currentNumber);
  }

  private calculate(
    firstOperand: number,
    secondOperand: number,
    operator: string
  ): number | null {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '×':
        return firstOperand * secondOperand;
      case '÷':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  }

  private updateDisplay(value: string): void {
    if (value.length > 12) {
      const num = parseFloat(value);
      if (Math.abs(num) >= 1e12) {
        value = num.toExponential(5);
      } else {
        value = num.toPrecision(12);
      }
    }

    this.displaySubject.next(value);
  }

  getCurrentDisplay(): string {
    return this.displaySubject.value;
  }

  memoryAdd(): void {
    this.memory += parseFloat(this.currentNumber) || 0;
  }

  memorySubtract(): void {
    this.memory -= parseFloat(this.currentNumber) || 0;
  }

  memoryRecall(): void {
    this.currentNumber = String(this.memory);
    this.updateDisplay(this.currentNumber);
    this.waitingForOperand = true;
  }

  memoryClear(): void {
    this.memory = 0;
  }
}
