document.addEventListener('DOMContentLoaded', () => {

    const previousOperandTextElement = document.querySelector('#previous-operand')
    const currentOperandTextElement = document.querySelector('#current-operand')
    const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

    const numberButtons = document.querySelectorAll('[data-number]')
    const operationButtons = document.querySelectorAll('[data-operation]')
    const equalsButton = document.querySelector('#equals')
    const deleteButton = document.querySelector('#delete')
    const clearButton = document.querySelector('#clear')
    const decimalButton = document.querySelector('#decimal')
    const clearinter = document.querySelector('#clint')


    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.appendNumber(button.innerText)
            calculator.updateDisplay()
        })
    })

    operationButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.chooseOperation(button.innerText)
            calculator.updateDisplay()
        })
    })

    equalsButton.addEventListener('click', button => {
        calculator.compute()
        calculator.updateDisplay()
    })

    clearButton.addEventListener('click', button => {
        calculator.clear()
        calculator.updateDisplay()
    })
    clearinter.addEventListener('click', button => {
        calculator.resetIntermediateResult()
        calculator.updateDisplay()
    })

    deleteButton.addEventListener('click', button => {
        calculator.delete()
        calculator.updateDisplay()
    })

    decimalButton.addEventListener('click', button => {
        console.log(button.innerText)
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })

    const appIcon = document.querySelector('#calculator-modal-button');
    const modal = document.getElementById('calculator-modal');

    appIcon.addEventListener('click', () => {
    modal.style.display = 'block';
    });
    
    // Cick outside the modal to close it
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});

