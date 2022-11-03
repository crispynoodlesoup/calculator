const display = document.querySelector("#display");
const auxiliaryText = document.querySelector("#display-previous");
const mainText = document.querySelector("#display-input");
const displayLength = 12;
let shift = false;
let erase = false;
let operation = "";
let auxStr = "";
let mainStr = "";
let operand = "";

auxiliaryText.innerText = auxStr;

const updateDisplay = () => {
    auxiliaryText.innerText = auxStr;
    if (mainStr.length > displayLength)
        mainStr = mainStr.substring(0, displayLength);
    mainText.innerText = mainStr;
};

const add = (a, b) => Number.parseFloat(a) + Number.parseFloat(b);
const subtract = (a, b) => Number.parseFloat(a) - Number.parseFloat(b);
const multiply = (a, b) => Number.parseFloat(a) * Number.parseFloat(b);
const divide = (a, b) => Number.parseFloat(a) / Number.parseFloat(b);

const operate = () => {
    if (operation != "") {
        let operand2 = mainStr;
        let result = "ERROR";
        if (operation === "-")
            result = subtract(operand, operand2);
        if (operation === "+")
            result = add(operand, operand2);

        result = formatFloat(result);
        console.log(result);
        if(result == "PRECISION")
            auxStr = "ERROR";
        else {
            auxStr = `${operand} ${operation} ${operand2} =`;
            erase = true;
        }
        operand = "";
        mainStr = result;
    }
};

const inputKeyboard = (e) => {
    console.log(e.keyCode);

    // backspace
    if (e.keyCode === 8 && mainStr.length > 0)
        mainStr = mainStr.substring(0, mainStr.length - 1);

    // erase screen on click if mainStr is NaN
    if (isNaN(Number(mainStr)) && !(mainStr === "-")) {
        mainStr = "";
        auxStr = "";
    }

    // erase display
    if (erase && ((e.keyCode <= 57 && e.keyCode >= 48) || e.keyCode == 8)) {
        mainStr = "";
        erase = false;
    }

    // digits 0-9
    if (e.keyCode <= 57 && e.keyCode >= 48)
        mainStr += `${e.keyCode - 48}`;

    // minus
    if (e.keyCode === 189) {
        if (!mainStr) {
            mainStr += "-";
        } else {
            erase = false;
            operation = "-";
            if (!operand && mainStr) {
                operand = mainStr;
                mainStr = "";
                auxStr = `${operand} -`;
            } else if (!mainStr && operand) {
                auxStr = `${operand} -`;
            } else if (mainStr && operand)
                operate();
        }
    }

    // plus
    if (e.keyCode === 187 && shift) {
        erase = false;
        operation = "+";
        if (!operand && mainStr) {
            operand = mainStr;
            mainStr = "";
            auxStr = `${operand} +`;
        } else if (!mainStr && operand) {
            auxStr = `${operand} +`;
        } else if (mainStr && operand)
            operate();
    }

    // enter
    if (e.keyCode === 13 && Boolean(Number(mainStr)) && operand) {
        erase = false;
        operate();
        operation = "";
    }

    // period
    if (e.keyCode === 190 && !mainStr.includes(".")) {
        if (!mainStr)
            mainStr += "0";
        mainStr += ".";
    }

    // shift
    if (e.keyCode === 16)
        shift = true;

    updateDisplay();
};

const letGoShift = (e) => {
    if (e.keyCode == 16)
        shift = false;
};

const formatFloat = (f) => {
    if(`${f}`.length <= displayLength)
        return f;
    if(`${Math.trunc(f)}`.length + 1 > displayLength)
        return "PRECISION";
    return f.toFixed(displayLength - (`${Math.trunc(f)}`.length + 1));
};

console.log(formatFloat(123456789.1234));
console.log(formatFloat(1234567890.123));
console.log(formatFloat(12345678.12345));
console.log(formatFloat(12345678.2));

auxiliaryText.innerText = "Welcome to";
mainText.innerText = "CALCULATOR!";

window.addEventListener("keydown", inputKeyboard);
window.addEventListener("keyup", letGoShift);