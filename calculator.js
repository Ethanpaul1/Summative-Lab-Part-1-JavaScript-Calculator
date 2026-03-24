const readline = require("readline");

const calculationHistory = [];

function addToHistory(firstNumber, secondNumber, operator, result) {
  calculationHistory.push({
    operands: [firstNumber, secondNumber],
    operator,
    result,
  });
}

function add(firstNumber, secondNumber) {
  const result = firstNumber + secondNumber;
  addToHistory(firstNumber, secondNumber, "+", result);
  return result;
}

function subtract(firstNumber, secondNumber) {
  const result = firstNumber - secondNumber;
  addToHistory(firstNumber, secondNumber, "-", result);
  return result;
}

function multiply(firstNumber, secondNumber) {
  const result = firstNumber * secondNumber;
  addToHistory(firstNumber, secondNumber, "*", result);
  return result;
}

function divide(firstNumber, secondNumber) {
  if (secondNumber === 0) {
    return "Error: Division by zero is not allowed.";
  }

  const result = firstNumber / secondNumber;
  addToHistory(firstNumber, secondNumber, "/", result);
  return result;
}

function displayHistory() {
  if (calculationHistory.length === 0) {
    console.log("No calculations stored yet.");
    return;
  }

  console.log("\nCalculation History:");

  calculationHistory.forEach((entry, index) => {
    const [firstNumber, secondNumber] = entry.operands;
    console.log(
      `${index + 1}. ${firstNumber} ${entry.operator} ${secondNumber} = ${entry.result}`
    );
  });
}

function showMenu() {
  console.log("\nJavaScript Calculator");
  console.log("1. Add");
  console.log("2. Subtract");
  console.log("3. Multiply");
  console.log("4. Divide");
  console.log("5. Display history");
  console.log("6. Exit");
}

function askQuestion(reader, questionText) {
  return new Promise((resolve) => {
    reader.question(questionText, (answer) => resolve(answer.trim()));
  });
}

async function getNumberInput(reader, promptText) {
  while (true) {
    const value = await askQuestion(reader, promptText);
    const parsedNumber = Number(value);

    if (!Number.isNaN(parsedNumber)) {
      return parsedNumber;
    }

    console.log("Please enter a valid number.");
  }
}

async function handleCalculation(reader, operation) {
  const firstNumber = await getNumberInput(reader, "Enter the first number: ");
  const secondNumber = await getNumberInput(reader, "Enter the second number: ");

  const result = operation(firstNumber, secondNumber);
  console.log(`Result: ${result}`);
}

async function runCalculator() {
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let shouldContinue = true;

  while (shouldContinue) {
    showMenu();
    const choice = await askQuestion(reader, "Choose an option (1-6): ");

    switch (choice) {
      case "1":
        await handleCalculation(reader, add);
        break;
      case "2":
        await handleCalculation(reader, subtract);
        break;
      case "3":
        await handleCalculation(reader, multiply);
        break;
      case "4":
        await handleCalculation(reader, divide);
        break;
      case "5":
        displayHistory();
        break;
      case "6":
        shouldContinue = false;
        console.log("Calculator closed.");
        break;
      default:
        console.log("Invalid option. Please choose a number from 1 to 6.");
    }
  }

  reader.close();
}

module.exports = {
  calculationHistory,
  add,
  subtract,
  multiply,
  divide,
  displayHistory,
  addToHistory,
  runCalculator,
};

if (require.main === module) {
  runCalculator();
}
