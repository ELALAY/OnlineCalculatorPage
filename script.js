
class Calculator {
	constructor(previousOeprandTextElement, currentOperandTextElement){
		this.previousOeprandTextElement = previousOeprandTextElement
		this.currentOperandTextElement = currentOperandTextElement
		this.clear()
	}

	clear() {
		this.currentOperand = ''
		this.previousOperand = ''
		this.operation = undefined
	}

	delete() {}

	appendNumber(number) {
		if(number === '.' && this.currentOperand.includes('.')) return 
		this.currentOperand = ( this.currentOperand.toString() + number.toString() )
	}

	 chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

	 compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

	UpdateDisplay() {
		this.currentOperandTextElement.innerText = this.currentOperand
		this.previousOeprandTextElement.innerText = this.previousOperand
	}
}

const numberButtons				 = document.querySelectorAll('[data-number]')
const operationButtons 			 = document.querySelectorAll('[data-operation]')
const equalsButton 				 = document.querySelector('[data-equals]')
const deleteButton				 = document.querySelector('[data-delete]')
const allClearButton			 = document.querySelector('[data-all-clear]')
const previousOeprandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement  = document.querySelector('[data-current-operad]')

const calculator = new Calculator(previousOeprandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText)
		calculator.UpdateDisplay()
	})
})

operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText)
		calculator.UpdateDisplay()
	})
})

equalsButton.addEventListener('click', button => {
	calculator.compute()
	calculator.UpdateDisplay()
})

allClearButton.addEventListener('click', button => {
	calculator.clear()
	calculator.UpdateDisplay()
})