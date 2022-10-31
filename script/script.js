const display =  document.querySelector("#display");
const displayLength = 12;
let dStr = "91827334132515431767139";

let updateDisplay = () => {
    if(dStr.length > displayLength)
        dStr = dStr.substring(dStr.length - displayLength, dStr.length);
    display.innerText = dStr;
};

updateDisplay();