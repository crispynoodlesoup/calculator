const display = document.querySelector("#display");
const auxiliaryText = document.querySelector("#display-previous");
const mainText = document.querySelector("#display-input");
const displayLength = 12;
let operation = "";
let auxStr = "omg hi =";
let mainStr = "";
let operand = "";

auxiliaryText.innerText = auxStr;

const updateDisplay = () => {
    if (mainStr.length > displayLength)
        mainStr = mainStr.substring(0, displayLength);
    mainText.innerText = mainStr;
    auxiliaryText.innerText = auxStr;
};

const add = (a, b) => Number.parseInt(a) + Number.parseInt(b);
const subtract = (a, b) => Number.parseInt(a) - Number.parseInt(b);
const multiply = (a, b) => Number.parseInt(a) * Number.parseInt(b);
const divide = (a, b) => Number.parseInt(a) / Number.parseInt(b);
const operate = () => {
    console.log("well we got here");
    if (operation != "") {
        let operand2 = mainStr;
        let result = "ERROR";
        if (operation === "-") {
            result = subtract(operand, operand2);
            auxStr = `${operand} ${operation} ${operand2} =`;
        }

        console.log(result);
        operand = "";
        mainStr = result;
    }
};

const inputKeyboard = (e) => {
    console.log(e);
    if (e.keyCode === 8 && mainStr.length > 0)
        mainStr = mainStr.substring(0, mainStr.length - 1);
    if (e.keyCode <= 57 && e.keyCode >= 48)
        mainStr += `${e.keyCode - 48}`;
    if (e.keyCode === 189) {
        operation = "-";
        if (operand === "") {
            operand = mainStr;
            mainStr = "";
            auxStr = `${operand} -`;
        } else
            operate();
    }
    if (e.keyCode === 13) {
        operate();
        operation = "";
    };
    updateDisplay();
};

updateDisplay();

window.addEventListener("keydown", inputKeyboard);