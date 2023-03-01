const Calculator = require('../modules/calculator').default;

test('compute addition marche', () => {
  const calculator = new Calculator();
  calculator.previousOperand = 5
  calculator.currentOperand = 2;
  calculator.operation = '+';
  calculator.compute();
  expect(calculator.currentOperand).toBe(7);
});

test('compute soustraction marche', () => {
  const calculator = new Calculator();
  calculator.previousOperand = 5
  calculator.currentOperand = 2;
  calculator.operation = '-';
  calculator.compute();
  expect(calculator.currentOperand).toBe(3);
});

test('compute multiplication marche', () => {
  const calculator = new Calculator();
  calculator.previousOperand = 5
  calculator.currentOperand = 2;
  calculator.operation = '*';
  calculator.compute();
  expect(calculator.currentOperand).toBe(10);
});

test('compute division marche', () => {
  const calculator = new Calculator();
  calculator.previousOperand = 5
  calculator.currentOperand = 2;
  calculator.operation = '÷';
  calculator.compute();
  expect(calculator.currentOperand).toBe(2.5);
});

