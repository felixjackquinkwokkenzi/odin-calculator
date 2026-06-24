// calculator state
const calculator = {
  displayValue: "0",
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,
  error: false,
};

const display = document.getElementById("display");
const decimalButton = document.querySelector('[data-action="decimal"]');

// calculator logic function
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return null;
  return a / b;
}

function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  if (Number.isNaN(a) || Number.isNaN(b)) return null;

  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}

// format display
function formatDisplay(value) {
  const str = String(value);

  if (str.includes(".")) {
    const [int, decimal] = str.split(".");
    if (decimal.length > 7) {
      return parseFloat(parseFloat(value).toFixed(7)).toString();
    }
  }

  if (str.length > 12) {
    return parseFloat(value).toExponential(6);
  }

  return str;
}

// update display
function updateDisplay() {
  display.textContent = formatDisplay(calculator.displayValue);
  if (decimalButton) {
    decimalButton.disabled = calculator.displayValue.includes(".");
  }
}

// reset calculator
function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.operator = null;
  calculator.waitingForSecondOperand = false;
  calculator.error = false;

  updateDisplay();
}

// input digit
function inputDigit(digit) {
  if (calculator.error) resetCalculator();

  if (calculator.waitingForSecondOperand) {
    if (calculator.operator === null) {
      calculator.firstOperand = null;
    }
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
    updateDisplay();
    return;
  }

  calculator.displayValue =
    calculator.displayValue === "0" ? digit : calculator.displayValue + digit;

  updateDisplay();
}

// input decimal
function inputDecimal() {
  if (calculator.error) resetCalculator();

  if (calculator.waitingForSecondOperand) {
    if (calculator.operator === null) {
      calculator.firstOperand = null;
    }
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    updateDisplay();
    return;
  }

  if (!calculator.displayValue.includes(".")) {
    calculator.displayValue += ".";
  }

  updateDisplay();
}

// delete last char
function deleteLastChar() {
  if (calculator.error) {
    resetCalculator();
    return;
  }

  calculator.displayValue = calculator.displayValue.slice(0, -1);

  if (calculator.displayValue === "" || calculator.displayValue === "-") {
    calculator.displayValue = "0";
  }

  updateDisplay();
}

// handle operator
function handleOperator(nextOperator) {
  if (calculator.error) resetCalculator();

  const inputValue = parseFloat(calculator.displayValue);

  if (calculator.operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (calculator.firstOperand === null) {
    calculator.firstOperand = inputValue;
  } else if (calculator.operator) {
    const result = operate(
      calculator.operator,
      calculator.firstOperand,
      inputValue,
    );

    if (result === null) {
      calculator.displayValue = "Error";
      calculator.error = true;
      updateDisplay();
      return;
    }

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;

  updateDisplay();
}

// handle equals
function handleEquals() {
  if (!calculator.operator || calculator.error) return;

  if (calculator.waitingForSecondOperand) return;

  const result = operate(
    calculator.operator,
    calculator.firstOperand,
    parseFloat(calculator.displayValue),
  );

  if (result === null) {
    calculator.displayValue = "Error";
    calculator.error = true;
    updateDisplay();
    return;
  }

  calculator.displayValue = String(result);

  calculator.firstOperand = result;
  calculator.operator = null;
  calculator.waitingForSecondOperand = true;

  updateDisplay();
}

// event listeners
document.querySelectorAll(".button-row button").forEach((button) => {
  button.addEventListener("click", () => {
    button.blur(); // Mencegah fokus tetap berada di tombol setelah diklik
    const { number, operator, action } = button.dataset;

    if (number !== undefined) inputDigit(number);
    else if (operator !== undefined) handleOperator(operator);
    else if (action === "decimal") inputDecimal();
    else if (action === "clear") resetCalculator();
    else if (action === "delete") deleteLastChar();
    else if (action === "calculate") handleEquals();
  });
});

// keyboard support
document.addEventListener("keydown", (e) => {
  let handled = true;

  if (e.key >= "0" && e.key <= "9") inputDigit(e.key);
  else if (e.key === ".") inputDecimal();
  else if (e.key === "+") handleOperator("+");
  else if (e.key === "-") handleOperator("-");
  else if (e.key === "*") handleOperator("*");
  else if (e.key === "/") handleOperator("/");
  else if (e.key === "Enter" || e.key === "=") handleEquals();
  else if (e.key === "Backspace") deleteLastChar();
  else if (e.key === "Escape") resetCalculator();
  else handled = false;

  if (handled) {
    e.preventDefault();
  }
});

// initial render
updateDisplay();
