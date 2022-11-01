const display = document.querySelector("#display");
const auxiliaryText = document.querySelector("#display-previous");
const mainText = document.querySelector("#display-input");
const displayLength = 12;
let auxStr = "129440 * 129740 =";
let mainStr = "129470983740";

auxiliaryText.innerText = auxStr;

const updateDisplay = () => {
    if(mainStr.length > displayLength)
        mainStr = mainStr.substring(0, displayLength);
    mainText.innerText = mainStr;
};

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const inputKeyboard = (e) => {
    console.log(e.keyCode);
};

updateDisplay();

window.addEventListener("keydown", inputKeyboard);