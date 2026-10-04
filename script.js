let current = "";
let previous = "";
let operation = null;


/* Display */

function updateDisplay() {

    document.getElementById("current").innerText =
        current || "0";

    document.getElementById("previous").innerText =
        previous && operation
            ? `${previous} ${getOperationSymbol(operation)}`
            : "";
}


/* Number */

function appendNumber(number) {

    if (number === "." && current.includes(".")) {
        return;
    }

    current += number;

    updateDisplay();
}


/* Operation */

function chooseOperation(op) {

    if (current === "" && previous === "") {
        return;
    }

    if (current !== "" && previous !== "") {
        calculate();
    }

    if (current !== "") {

        previous = current;

        current = "";

    }

    operation = op;

    updateDisplay();
}


/* Calculate */

function calculate() {

    if (previous === "" || current === "" || !operation) {
        return;
    }

    const prev = parseFloat(previous);
    const curr = parseFloat(current);

    let result;

    switch (operation) {

        case "+":
            result = prev + curr;
            break;

        case "-":
            result = prev - curr;
            break;

        case "*":
            result = prev * curr;
            break;

        case "/":

            if (curr === 0) {

                current = "Error";

                previous = "";
                operation = null;

                updateDisplay();

                return;
            }

            result = prev / curr;

            break;

        case "%":
            result = prev % curr;
            break;
    }

    current = String(
        Math.round(result * 100000000) / 100000000
    );

    previous = "";
    operation = null;

    updateDisplay();
}


/* Clear */

function clearDisplay() {

    current = "";
    previous = "";
    operation = null;

    updateDisplay();
}


/* Delete */

function deleteNumber() {

    current = current.slice(0, -1);

    updateDisplay();
}


/* Operator symbol */

function getOperationSymbol(op) {

    const symbols = {

        "+": "+",

        "-": "−",

        "*": "×",

        "/": "÷",

        "%": "%"

    };

    return symbols[op];
}


/* Keyboard support */

document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (!isNaN(key) || key === ".") {

        appendNumber(key);

    }

    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "%"
    ) {

        chooseOperation(key);

    }

    else if (key === "Enter" || key === "=") {

        calculate();

    }

    else if (key === "Backspace") {

        deleteNumber();

    }

    else if (key === "Escape") {

        clearDisplay();

    }

});