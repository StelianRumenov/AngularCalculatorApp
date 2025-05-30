# Angular Calculator Application

A simple calculator application built with Angular 20, demonstrating core Angular concepts including Components, Services, and Routing.

## Features

- Basic arithmetic operations (addition, subtraction, multiplication, division)
- Clear and All Clear functionality
- Decimal number support
- Error handling for division by zero
- Keyboard support
- Responsive design
- Memory operations (M+, M-, MR, MC)
- History view with routing

## Architecture Decisions

### 1. Component Structure

- **CalculatorComponent**: Main calculator interface with button grid and display
- **HistoryComponent**: Separate view for calculation history
- **AppComponent**: Root component with navigation

### 2. Service Layer

- **CalculatorService**: Core calculation logic and state management
- **HistoryService**: Manages calculation history

### 3. Routing

- `/calculator` - Main calculator view (default)
- `/history` - Calculation history view

## Algorithm Explanation

### Calculation Logic

The calculator uses a state-based approach:

1. **Input Handling**: Numbers and operators are processed based on current state
2. **State Management**: Tracks current number, previous number, operator, and display value
3. **Operation Execution**: Performs calculations when equals is pressed or new operator is entered
4. **Error Handling**: Validates operations and handles edge cases

### Key Methods

- `inputNumber(num: string)`: Handles numeric input with decimal support
- `inputOperator(op: string)`: Manages operator input and chain calculations
- `calculate()`: Executes pending operations
- `clear()` / `allClear()`: Reset functionality

## Edge Cases Handled

1. **Division by Zero**: Returns "Error", displayed as "Infinity" and resets calculator
2. **Multiple Decimals**: Prevents multiple decimal points in same number
3. **Operator Chaining**: Allows continuous calculations (e.g., 5 + 3 \* 2)
4. **Leading Zeros**: Handles numbers starting with 0 properly
5. **Memory Operations**: Validates memory recall when memory is empty
6. **Large Numbers**: Handles display overflow with scientific notation

## Installation and Setup

### Prerequisites

- Node.js (v20.19 or higher)
- npm or yarn
- Angular CLI

### Installation Steps

1. **Clone or extract the project**

   ```bash
   # If using git
   git clone <repository-url>
   cd angular-calculator

   # Or extract zip file
   unzip angular-calculator.zip
   cd angular-calculator
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the application**

   ```bash
   ng serve
   ```

4. **Open in browser**
   Navigate to `http://localhost:4200`

### Alternative Setup (if Angular CLI not installed)

```bash
npm install -g @angular/cli
ng new angular-calculator
# Copy the source files into the new project
npm install
ng serve
```

## Usage

### Basic Operations

- Click number buttons to input values
- Click operator buttons (+, -, ×, ÷) for operations
- Press = to calculate result
- Use C to clear current input, AC to clear all

### Memory Functions

- **M+**: Add current display to memory
- **M-**: Subtract current display from memory
- **MR**: Recall memory value
- **MC**: Clear memory

### Keyboard Support

- Numbers: 0-9
- Operators: +, -, \*, /
- Enter/= : Calculate
- Escape/C: Clear
- Backspace: Delete last digit

### Navigation

- Use the "History" button to view calculation history
- Use "Calculator" button to return to main calculator

## Technical Implementation

### State Management

The calculator maintains state through the CalculatorService using reactive patterns:

- Current display value
- Previous operand
- Current operator
- Memory value
- Calculation history

### Styling Approach

CSS without external libraries

## Development Notes

- Uses Angular 20 with standalone components
- Implements OnPush change detection for performance
- Uses TypeScript strict mode
- Responsive design supports mobile and desktop
