const calculator = {
  displayValue: "0",
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,
};

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    return "cannot divide by 0";
  }

  return num1 / num2;
}

function operate(operator, num1, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  if (Number.isNaN(num1) || Number.isNaN(num2)) {
    return null;
  }

  if (operator === "+") {
    return add(num1, num2);
  } else if (operator === "-") {
    return subtract(num1, num2);
  } else if (operator === "*") {
    return multiply(num1, num2);
  } else if (operator === "/") {
    return divide(num1, num2);
  } else {
    return "unknown operator";
  }
}
