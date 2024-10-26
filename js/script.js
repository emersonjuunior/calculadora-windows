const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  //método de mudar os valores na tela da calculadora
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // checa se o número é zero, se for, apenas adiciona o número atual
      if (previous === 0) {
        operationValue = current;
      }
      // adiciona o valor atual para o anterior
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  //adicionar dígito na tela da calculadora
  addDigit(digit) {
    //verifica se a operação já possui um ponto
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  //processar as operações da calculadora
  processOperation(operation) {
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      // Mudar a operação
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    // pegar o valor anterior e o atual
    let operationValue;
    let previous = +this.previousOperationText.innerText.split(" ")[0];
    let current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
        case "DEL":
        this.processDelOperator();
        break;
        case "CE":
        this.processClearCurrentOperation();
        break;
        case "C":
        this.processClearOperations();
        break;
        case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }

  //mudar as operações matemáticas
  changeOperation(operation){
    const mathOperations = ["*", "/", "+", "-"]

    if(!mathOperations.includes(operation)){
        return;
    }

    this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
  }


  //deleta o último dígito
  processDelOperator(){
    this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
  }

  //limpa a operação atual
  processClearCurrentOperation(){
    this.currentOperationText.innerText = "";
  }

  //limpa todas as operações
  processClearOperations(){
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  //processa as operações
  processEqualOperator(){
    const operation = previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (parseFloat(value) >= 0 || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});
