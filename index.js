function add(a, b){
    return Number(a) + Number(b);
}

function substract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(func, a, b){
    if((func(a,b) * 10000).toString().match(/\./)) return func(a,b).toFixed(4);
    return func(a,b);
}

function deleteLast(numberString){
    let numberSplitted = numberString.split('');
    numberSplitted.splice(numberString.length-1,1);
    return numberSplitted.join('');
}

const body = document.querySelector('body');
const buttons = document.querySelectorAll('[id^="btn-"]');
const display = document.getElementById('display');

const displayOperation = document.getElementById('operation');
const displayNumber = document.getElementById('number');

const keysCalc = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '+', '-', '*', '/', 'd', 'Enter', 'x']

function calculator (e) {

    let keyPush = '';

    // if (e.type === 'click') console.log(e.type, e.target.attributes[0].textContent);
    // else console.log(e.type, e.key, keysCalc.includes(e.key));

    if (e.type === 'click') keyPush = e.target.attributes[0].textContent;
    else if (e.type === 'keydown') {
        if (keysCalc.includes(e.key)) keyPush = e.key;
        else keyPush = '';
    }

    if(keyPush.match(/[0-9]/) && 
        (
            (displayNumber.textContent.length < 12 && displayNumber.textContent.indexOf('.') === -1) || 
            (displayNumber.textContent.substring(displayNumber.textContent.indexOf('.')).length < 5)
        )
      ) 
    {
        if(operator === 'Enter') {
            displayNumber.textContent = '';
            operator = '';
            num1 = undefined;
        } 
        displayNumber.textContent += keyPush;
        
    } else if(keyPush.match(/\./)) {
        
        if(operator === 'Enter') {
            displayNumber.textContent = '';
            operator = '';
            num1 = undefined;
        } 

        if(displayNumber.textContent === '') displayNumber.textContent += 0;
        
        if(displayNumber.textContent.indexOf('.') === -1) {
            displayNumber.textContent += keyPush;
        }

    } else if(keyPush.match(/d/)){
        
        displayNumber.textContent = deleteLast(displayNumber.textContent);
        num1 = Number(displayNumber.textContent);

    } else if(keyPush.match(/[\+\-*\/Enter]/)){
    
        if(num1 === undefined) num1 = Number(displayNumber.textContent);
        else {
            num2 = Number(displayNumber.textContent);
            if (operator === '+') num1 = operate(add, num1, num2);
            else if (operator === '-') num1 = operate(substract, num1, num2);
            else if (operator === '*') num1 = operate(multiply, num1, num2);
            else if (operator === '/') num1 = operate(divide, num1, num2);
        } 
        
        operator = keyPush;
        num2 = undefined;
        displayNumber.textContent = '';

        if (num1 > Number.MAX_SAFE_INTEGER) {
            num1 = undefined;
            num2 = undefined;
            displayOperation.textContent = '';
            displayNumber.textContent = '';
            alert('Error, number out of range');
        } 
        else if(num1 !== 0) displayOperation.textContent = num1 + operator;
        
        if (operator === 'Enter') {
            displayNumber.textContent = num1;
            displayOperation.textContent = '';
        }

    } else if(keyPush.match(/x/)) {

        num1 = undefined;
        num2 = undefined;
        operator = '';
        displayOperation.textContent = '';
        displayNumber.textContent = '';
    }

   }
   
   
let num1, num2, operator = '';

body.addEventListener('keydown', (e) => {calculator(e)}, false);

buttons.forEach((button) => {
        button.addEventListener('click', (e) => {calculator(e)}, false);
    });