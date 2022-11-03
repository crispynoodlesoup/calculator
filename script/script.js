const display = document.querySelector("#display");
const auxiliaryText = document.querySelector("#display-previous");
const mainText = document.querySelector("#display-input");
const displayLength = 15;
let shift = false;
let erase = false;
let operation = "";
let auxStr = "";
let mainStr = "";
let operand = "";

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
        if (operation === "+")
            result = add(operand, operand2);
        if (operation === "-")
            result = subtract(operand, operand2);
        if (operation === "*")
            result = multiply(operand, operand2);
        if (operation === "/")
            result = divide(operand, operand2);

        result = formatFloat(result);
        console.log(result);
        if (result == "TOO BIG")
            auxStr = "ERROR";
        else if (`${result}` == "Infinity") {
            auxStr = "ERROR";
            result = "STUPIDITY";
        } else {
            auxStr = `${operand} ${operation} ${operand2} =`;
            erase = true;
        }
        operand = "";
        mainStr = result;
    }
};

const inputKeyboard = (e) => {
    console.log(e.keyCode);

    // to account for special case of asterisk and plus
    let code = e.keyCode;
    if (shift && (code == 187 || code == 56))
        code += 1000;

    // animation stuff!!
    const button = document.querySelector(`button[data-key="${code}"]`);
    if (button)
        button.classList.add("button-animation");

    // backspace
    if (e.keyCode === 8 && mainStr.length > 0)
        mainStr = mainStr.substring(0, mainStr.length - 1);

    // erase screen on click if mainStr is NaN
    if (isNaN(Number(mainStr)) && !(mainStr === "-") || e.keyCode == 87) {
        mainStr = "";
        auxStr = "";
    }

    // erase display
    if (erase && ((e.keyCode <= 57 && e.keyCode >= 48 && !shift) || e.keyCode == 8)) {
        mainStr = "";
        erase = false;
    }

    // digits 0-9
    if (e.keyCode <= 57 && e.keyCode >= 48 && !shift)
        mainStr += `${e.keyCode - 48}`;

    // minus
    if (e.keyCode === 189) {
        if (!mainStr) {
            mainStr += "-";
        } else {
            erase = false;
            operation = "-";
            if (!operand && mainStr && !isNaN(Number(mainStr))) {
                operand = mainStr;
                mainStr = "";
                auxStr = `${operand} -`;
            } else if (!mainStr && operand) {
                auxStr = `${operand} -`;
            } else if (mainStr && operand && !isNaN(Number(mainStr)))
                operate();
        }
    }

    // plus
    if (e.keyCode === 187 && shift) {
        erase = false;
        operation = "+";
        if (!operand && mainStr && !isNaN(Number(mainStr))) {
            operand = mainStr;
            mainStr = "";
            auxStr = `${operand} +`;
        } else if (!mainStr && operand) {
            auxStr = `${operand} +`;
        } else if (mainStr && operand && !isNaN(Number(mainStr)))
            operate();
    }

    // asterisk
    if (e.keyCode === 56 && shift) {
        erase = false;
        operation = "*";
        if (!operand && mainStr && !isNaN(Number(mainStr))) {
            operand = mainStr;
            mainStr = "";
            auxStr = `${operand} *`;
        } else if (!mainStr && operand) {
            auxStr = `${operand} *`;
        } else if (mainStr && operand && !isNaN(Number(mainStr)))
            operate();
    }

    // slash
    if (e.keyCode === 191) {
        erase = false;
        operation = "/";
        if (!operand && mainStr && !isNaN(Number(mainStr))) {
            operand = mainStr;
            mainStr = "";
            auxStr = `${operand} /`;
        } else if (!mainStr && operand) {
            auxStr = `${operand} /`;
        } else if (mainStr && operand && !isNaN(Number(mainStr)))
            operate();
    }

    // enter
    if (e.keyCode === 13 && mainStr && !isNaN(Number(mainStr)) && operand) {
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

const keyUp = (e) => {
    if (e.keyCode == 16)
        shift = false;
    
    let code = e.keyCode;
    if (shift && (code == 187 || code == 56))
        code += 1000;
    const button = document.querySelector(`button[data-key="${code}"]`);
    if(button)
        button.classList.remove("button-animation");
};

const formatFloat = (f) => {
    if (`${f}`.length <= displayLength)
        return f;
    if (`${Math.trunc(f)}`.length + 1 > displayLength)
        return "TOO BIG";
    return f.toFixed(displayLength - (`${Math.trunc(f)}`.length + 1));
};

auxiliaryText.innerText = "Welcome to";
mainText.innerText = "CALCULATOR!";

window.addEventListener("keydown", inputKeyboard);
window.addEventListener("keyup", keyUp);
