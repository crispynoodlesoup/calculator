const display =  document.querySelector("#display");
const displayLength = 12;
let dStr = "91827334";

const updateDisplay = () => {
    if(dStr.length > displayLength)
        dStr = dStr.substring(0, displayLength);
    display.innerText = dStr;
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