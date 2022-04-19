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

const buttons = document.querySelectorAll('[id^="btn-"]');
const display = document.getElementById('display');

const displayOperation = document.getElementById('operation');
const displayNumber = document.getElementById('number');

// display.appendChild(pOperation);
// display.appendChild(pNumber);

let num1, num2, operator = '';

buttons.forEach((button) => {
   button.addEventListener('click', () => {
       if(button.attributes[1].textContent.match(/[0-9]/) && 
            (
                (displayNumber.textContent.length < 12 && displayNumber.textContent.indexOf('.') === -1) || 
                (displayNumber.textContent.substring(displayNumber.textContent.indexOf('.')).length < 5)
            )
         ) {
          if(operator === '=') {
            displayNumber.textContent = '';
            operator = '';
            num1 = undefined;
          } 
          displayNumber.textContent += button.attributes[1].textContent;
    //    }
            
       } else if(button.attributes[1].textContent.match(/\./)) {
            
            if(operator === '=') {
                displayNumber.textContent = '';
                operator = '';
                num1 = undefined;
            } 

            if(displayNumber.textContent === '') displayNumber.textContent += 0;
            
            if(displayNumber.textContent.indexOf('.') === -1) {
                displayNumber.textContent += button.attributes[1].textContent;
                // console.log(displayNumber.textContent);
                // console.log(displayNumber.textContent.indexOf('.'));
            }

            // console.log(displayNumber.textContent);
            // console.log((displayNumber.textContent.substring(0,(displayNumber.textContent.indexOf('.'))).match(/'.'/)));
            // if(!(button.attributes[1].textContent.substring(0,(button.textContent.indexOf('.'))).match(/'.'/))){
            //        console.log("ya hay un punto!");

            // }
        //     && !(button.attributes[1].textContent.substring(0,(button.textContent.indexOf('.'))).match(/'.'/))) {
        //     displayNumber.textContent += 0 + button.attributes[1].textContent;
        //   } else if (button.attributes[1].textContent.substring(0,(button.textContent.indexOf('.'))).match(/'.'/)) {
        //     displayNumber.textContent = deleteLast(displayNumber.textContent);
        //   }
       } else if(button.attributes[1].textContent.match(/x/)){
           
        //   let numberSplitted = displayNumber.textContent.split('');
        //   let numberJoined = numberSplitted.splice(displayNumber.textContent.length-1,1);
        //   displayNumber.textContent = numberSplitted.join('');
        //     num1 = Number(displayNumber.textContent);
            displayNumber.textContent = deleteLast(displayNumber.textContent);
            num1 = Number(displayNumber.textContent);

       } else if(button.attributes[1].textContent.match(/[\+\-*\/\=]/)){
        
            if(num1 === undefined) num1 = Number(displayNumber.textContent);
            else {
                num2 = Number(displayNumber.textContent);
                if (operator === '+') num1 = operate(add, num1, num2);
                else if (operator === '-') num1 = operate(substract, num1, num2);
                else if (operator === '*') num1 = operate(multiply, num1, num2);
                else if (operator === '/') num1 = operate(divide, num1, num2);
            } 
            
            operator = button.attributes[1].textContent;
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
            
            if (operator === '=') {
                displayNumber.textContent = num1;
                displayOperation.textContent = '';
            }
       } else if(button.attributes[1].textContent.match(/clear/)){
            num1 = undefined;
            num2 = undefined;
            displayOperation.textContent = '';
            displayNumber.textContent = '';
       }

   });
});


// console.log(buttons);