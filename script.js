let buttons = document.getElementsByClassName('buttons_wrapper')[0];
let averageElement = document.getElementById('average');
let numbersElement = document.getElementById('numbers');

let id = 0;
let createElement = function(number) {
    const numberElement = document.createElement('div');
    const textNode = document.createTextNode(number);
    numberElement.appendChild(textNode);
    numberElement.classList.add('number');
    numberElement.dataset.index = `${id}`;

    return numberElement;
}

let countNumbers = 0;
let numbers = [];

function averageCounter(number) {
    let average;
    if (number) {
        countNumbers++;
        numbers.push({
            index: id,
            value: number
        });
    }

    const sum = numbers.reduce((acc, { value })=>{
        return acc + value
    },0)

    average = sum / countNumbers;

    return average;
}

let callBackButtons = function(event) {
    const number = event.target.innerText;
    switch (number) {
        case '⌫': {
            if (countNumbers !== 0) {
                numbers.pop();
                countNumbers--;
            }

            if (countNumbers <= 0) {
                const numberElement = document.getElementsByClassName('number');
                if (numberElement.length) {
                    numbersElement.removeChild(numberElement[numberElement.length - 1]);
                }
                averageElement.innerText = '';
                break;
            }

            const result = averageCounter();
            averageElement.innerText = result;

            const numberElement = document.getElementsByClassName('number');
            numbersElement.removeChild(numberElement[numberElement.length - 1]);
            break;
        }
        case 'CE': {
            numbers = [];
            countNumbers = 0;
            id = 0;
            averageElement.innerText = '';
            numbersElement.innerText = '';
            break;
        }
        default: {
            const result = averageCounter(Number(number));
            averageElement.innerText = result;
            numbersElement.appendChild(createElement(number));
            id++;
            break;
        }
    }
}

let callbackNumbers = function(event) {
    let number = event.target.dataset.index;

    let numberElement = document.getElementsByClassName('number');
    let removeElement;
    for (let i = 0; i < numberElement.length; i++) {
        if (numberElement[i].dataset.index === number) {
            removeElement = numberElement[i];
        }
    }
    numbersElement.removeChild(removeElement);

    numbers = numbers.filter(({index}) => index !== +number);
    countNumbers--;
    const result = averageCounter();

    if (result) {
        averageElement.innerText = result;
    }
    else {
        averageElement.innerText = '';
    }
}

buttons.addEventListener('click', callBackButtons);
numbersElement.addEventListener('click', callbackNumbers);