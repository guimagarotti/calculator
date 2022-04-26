const buttonNumber = document.querySelectorAll('[data-number]');
const buttonOperator = document.querySelectorAll('[data-operator]');
const buttonClear = document.querySelector('[data-clear]');
const buttonDelete = document.querySelector('[data-delete]');
const buttonResult = document.querySelector('[data-result]');

const previousNumberText = document.querySelector('[data-previous-value]');
const currentNumberText = document.querySelector('[data-current-value]');

class Calculator {
    constructor(previousNumberText, currentNumberText) {
        this.previousNumberText = previousNumberText;
        this.currentNumberText = currentNumberText;
        this.clear();        
    }

    formatNumber(number) {
        const stringNumber = number.toString();
        const intDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigit = stringNumber.split('.')[1];

        let intDisplay;

        if (isNaN(intDigits)) {
            intDisplay = '';
        } else {
            intDisplay = intDigits.toLocaleString('en', {
                maximumFractionDigits: 0,
            });
        }

        if (decimalDigit != null) {
            return `${intDisplay}.${decimalDigit}`;
        } else {
            return intDisplay;
        }
    }    
    
    delete() {
        this.currentValue = this.currentValue.toString().slice(0, -1);
    }

    calculate() {
        let result;

        const _previousValue = parseFloat(this.previousValue);
        const _currentValue = parseFloat(this.currentValue);

        if (isNaN(_previousValue) || isNaN(_currentValue)) return;

        switch (this.operation) {
            case '+':
                result = _previousValue + _currentValue;
                break;
            case '-':
                result = _previousValue - _currentValue;
                break;
            case '*':
                result = _previousValue * _currentValue;
                break;
            case '÷':
                result = _previousValue / _currentValue;
                break;
            default:
                return;
        }

        this.currentValue = result;
        this.previousValue = '';
        this.operation = undefined;
    }
    
    chooseOperator(operator) {
        if(this.currentValue === '') return;
        
        if (this.previousValue !== '') {
            this.calculate();
        }
        
        this.operation = operator;
        
        this.previousValue = this.currentValue;
        this.currentValue = '';
    }
    
    addNumber(number) {
        if(this.currentValue.includes('.') && number === '.') return;
        this.currentValue = `${this.currentValue}${number.toString()}`;
    }
    
    clear() {
        this.currentValue = '';
        this.previousValue = '';
        this.operation = undefined;
    }

    changeDisplay() {
        this.previousNumberText.innerText = `${this.formatNumber(this.previousValue)} ${this.operator || ''}`;
        this.currentNumberText.innerText = this.formatNumber(this.currentValue);
    }
}

const calculator = new Calculator (
    previousNumberText,
    currentNumberText    
);

for (const number of buttonNumber) {
    number.addEventListener('click', function () {
        calculator.addNumber(number.innerText);
        calculator.changeDisplay();
    })
}

for (const operator of buttonOperator) {
    operator.addEventListener('click', function() {
        calculator.chooseOperator(operator.innerText);
        calculator.changeDisplay();
    })
}

buttonClear.addEventListener('click', function() {
    calculator.clear();
    calculator.changeDisplay();
})

buttonResult.addEventListener('click', function() {
    calculator.calculate();
    calculator.changeDisplay();    
})

buttonDelete.addEventListener('click', function() {
    calculator.delete();
    calculator.changeDisplay();
})






