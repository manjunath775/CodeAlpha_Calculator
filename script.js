const display = document.getElementById("display");

let firstNumber = "";
let operator = "";
let waitingForSecondNumber = false;

function appendNumber(number) {

    if (display.value === "0" || waitingForSecondNumber) {
        display.value = number;
        waitingForSecondNumber = false;
    } else {
        display.value += number;
    }
}

function chooseOperator(selectedOperator) {

    if (operator !== "" && !waitingForSecondNumber) {
        calculate();
    }

    firstNumber = display.value;
    operator = selectedOperator;
    waitingForSecondNumber = true;
}

function calculate() {

    if (operator === "" || firstNumber === "") {
        return;
    }

    const secondNumber = display.value;

    let result;

    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);

    switch (operator) {

        case "+":
            result = num1 + num2;
            break;

        case "-":
            result = num1 - num2;
            break;

        case "*":
            result = num1 * num2;
            break;

        case "/":
            if (num2 === 0) {
                display.value = "Error";
                resetCalculator();
                return;
            }

            result = num1 / num2;
            break;
    }

    display.value = result;
    firstNumber = result.toString();
    operator = "";
    waitingForSecondNumber = true;
}

function clearDisplay() {
    display.value = "0";
    resetCalculator();
}

function resetCalculator() {
    firstNumber = "";
    operator = "";
    waitingForSecondNumber = false;
}

function deleteLast() {

    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = "0";
    }
}

document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (!isNaN(key) || key === ".") {
        appendNumber(key);
    }

    else if (key === "+") {
        chooseOperator("+");
    }

    else if (key === "-") {
        chooseOperator("-");
    }

    else if (key === "*") {
        chooseOperator("*");
    }

    else if (key === "/") {
        event.preventDefault();
        chooseOperator("/");
    }

    else if (key === "Enter" || key === "=") {
        calculate();
    }

    else if (key === "Escape") {
        clearDisplay();
    }

    else if (key === "Backspace") {
        deleteLast();
    }
});