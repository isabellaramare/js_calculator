class Calculator {

    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()        
    }

    clear() {
        this.result = ''
        this.history = ''
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
        this.showResult = false 
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
        const str = this.currentOperand.replace(/\s/g, '')
        this.insert(str.length)
    }

    appendNumber(number) {
        if (this.showResult) this.currentOperand = ''
        this.showResult = false        
        if (number === '.' && this.currentOperand.includes('.')) return
        // max 16 numbers (plus commas) long
        this.currentOperand = this.currentOperand.toString() + number.toString()  
        const str = this.currentOperand.replace(/\s/g, '')
        const length = str.length
        if (length >= 21) return
        if (length >= 4) {
            this.currentOperand = this.insert(length)                   
        }
    }

    insert(length) {
        // index depends on length
        const value= ' '
        const str = this.currentOperand.replace(/\s/g, '')

        switch (length) {              
            case 4:
                return str.substr(0, 1) + value + str.substr(1);                
            case 5:
                return str.substr(0, 2) + value + str.substr(2);                
            case 6:
                return str.substr(0, 3) + value + str.substr(3);  
            case 7:                
                return str.substr(0, 2) + value + str.substr(2);    
            case 8: 
                return str.substr(0, 1) + value + str.substr(1);                
            case 9:
                return str.substr(0, 2) + value + str.substr(2);                
            case 10:
                return str.substr(0, 2) + value + str.substr(2);                
            case 11:
                return str.substr(0, 2) + value + str.substr(2);  
            case 12:                
                return str.substr(0, 2) + value + str.substr(2);  
            case 13: 
                return str.substr(0, 1) + value + str.substr(1);                
            case 14:
                return str.substr(0, 2) + value + str.substr(2);                
            case 15:
                return str.substr(0, 2) + value + str.substr(2);                
            case 16:
                return str.substr(0, 2) + value + str.substr(2);              
            default:                             
                return
        }         
    }

    compute(operation) {     
        let computation
        const prev = parseFloat(this.previousOperand.replace(/\s/g, ''))
        const current = parseFloat(this.currentOperand.replace(/\s/g, ''))
        
        //if no current operand
        if (isNaN(current)) return

        // if no previousOperand
        if (isNaN(prev)) {
            this.previousOperand = this.currentOperand
            this.operation = operation
            this.history += this.currentOperand + this.operation 
            this.currentOperand = '' 
            return
        }

        switch (this.operation) {
            case '+': 
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break  
            case '=':
                
                break          
            default:                             
                return
        }         
          
        this.operation = operation
        this.history += this.currentOperand + this.operation   
        this.result = computation    
        this.previousOperand = this.result
        
        this.showResult = true         
        this.currentOperand = this.result   
    }

    updateDisplay() {
        // if operation undefined, show currentOperand
        // if operation defined, show result

        testCurrent.innerText = this.currentOperand
        testPrevious.innerText = this.previousOperand
        testHistory.innerText = this.history
        testResult.innerText = this.result
        
        this.currentOperandTextElement.innerText = this.currentOperand 
        this.previousOperandTextElement.innerText = this.history        
    }
}


const testCurrent = document.querySelector('[data-current]')
const testPrevious = document.querySelector('[data-previous]')
const testHistory = document.querySelector('[data-history]')
const testResult = document.querySelector('[data-result]')

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.compute(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute('=')
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
