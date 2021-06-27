let buttons = document.getElementsByTagName("button");
let inputLabel = document.getElementById("input");
for(let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", () => buttonClicked(buttons[i]));
}

let num1 = null, num2 = null;
let opClicked = false;

function handleOperator(param) {
    let value = 0;
    if(num1 == null) {
        inputLabel.innerText += "Input a number first";
        setTimeout(() => inputLabel.innerText = "", 1000);
    }
    else if(num2 == null) {
        opClicked = true;
    }
    else {
        switch(param) {
            case '+':
                value = num1 + num2;
                break;
            case '-':
                value = num1 - num2;
                break;
            case '*':
                value = num1 * num2;
                break;
            case '/':
                value = num1 / num2;
                break;
        }
    }
}

function getInteger(e) {
    if(!opClicked)
        num1 = parseInt(e.innerText);
    else
        num2 = parseInt(e.innerText);

    console.log(`${num1} ${num2}`);
}

function buttonClicked(e) {
    let text = "";
    switch(e.innerText) {
        case "AC":
            inputLabel.innerText = "";
            text = "";
            break;
        case "C":
            inputLabel.innerText = "";
            text = "0";
            break;
        default:
            text = e.innerText;
    }
    inputLabel.innerText += text;
}
