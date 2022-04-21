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

const numLockStatus = document.getElementById('numLockStatus');
const displayUp = document.getElementById('operation');
const displayDown = document.getElementById('number');

const KEYS_CALCULATOR = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '*', '-', '+', '/', 'd', 'Enter', 'x']

function calculator(e) {

    let keyPushed = '';

    // if (e.type === 'click') console.log(e.type, e.target.attributes[0].textContent);
    // else console.log(e.type, e.key, KEYS_CALCULATOR.includes(e.key));

    if (e.type === 'click') keyPushed = e.target.attributes[0].textContent;

    else if (e.type === 'keydown') {

        if (KEYS_CALCULATOR.includes(e.key)) {

            keyPushed = e.key;

            buttons[KEYS_CALCULATOR.indexOf(e.key)].classList.add("simulate_click");
        }
        else keyPushed = '';

        
        if(!(e.getModifierState('NumLock'))) numLockStatus.innerHTML = 'NumLock off';
        else numLockStatus.innerHTML = '';
    }

    if(keyPushed.match(/[0-9]/) && 
        (
            (displayDown.textContent.length < 12 && displayDown.textContent.indexOf('.') === -1) || 
            (displayDown.textContent.substring(displayDown.textContent.indexOf('.')).length < 5)
        )
      ) 
    {
        if(operator === 'Enter') {
            
            displayDown.textContent = '';
            operator = '';
            num1 = undefined;
        } 
        displayDown.textContent += keyPushed;
        
    } else if(keyPushed.match(/\./)) {
        
        if(operator === 'Enter') {

            displayDown.textContent = '';
            operator = '';
            num1 = undefined;
        } 

        if(displayDown.textContent === '') displayDown.textContent += 0;
        
        if(displayDown.textContent.indexOf('.') === -1) {

            displayDown.textContent += keyPushed;
        }

    } else if(keyPushed.match(/d/)){
        
        displayDown.textContent = deleteLast(displayDown.textContent);
        num1 = Number(displayDown.textContent);

    } else if(keyPushed.match(/[\+\-*\/Enter]/)){
    
        if(num1 === undefined) num1 = Number(displayDown.textContent);
        
        else {

            num2 = Number(displayDown.textContent);
            if (operator === '+') num1 = operate(add, num1, num2);
            else if (operator === '-') num1 = operate(substract, num1, num2);
            else if (operator === '*') num1 = operate(multiply, num1, num2);
            else if (operator === '/') num1 = operate(divide, num1, num2);
        } 
        
        operator = keyPushed;
        num2 = undefined;
        displayDown.textContent = '';

        if (num1 > Number.MAX_SAFE_INTEGER) {

            num1 = undefined;
            num2 = undefined;
            displayUp.textContent = '';
            displayDown.textContent = '';
            alert('Error, number out of range');
        } 
        else if(num1 !== 0) displayUp.textContent = num1 + operator;
        
        if (operator === 'Enter') {

            displayDown.textContent = num1;
            displayUp.textContent = '';
        }

    } else if(keyPushed.match(/x/)) {

        num1 = undefined;
        num2 = undefined;
        operator = '';
        displayUp.textContent = '';
        displayDown.textContent = '';
    }

    e.preventDefault();

   }
   
   
let num1, num2, operator = '';

window.addEventListener('keydown', (e) => { calculator(e) }, false);

window.addEventListener('keyup', (e) => {
    buttons[KEYS_CALCULATOR.indexOf(e.key)].classList.remove("simulate_click");
}, false);

buttons.forEach((button) => {
        button.addEventListener('click', (e) => { calculator(e) }, false);
    });