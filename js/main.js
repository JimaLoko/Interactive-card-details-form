const form = document.querySelector('#form')
const inputName = document.querySelector('#name')
const inputNumber = document.querySelector('#card-number')
const inputMonth = document.querySelector('#MM')
const inputYear = document.querySelector('#YY')
const inputCvc = document.querySelector('#cvc')
const cardName = document.querySelector('.name')
const cardNumber = document.querySelector('.number p')
const cardDate = document.querySelector('.date')
const cardCvc = document.querySelector('.cvc span')
const submit = document.querySelector('#submit')
const back = document.querySelector('button')
const modal = document.querySelector('.modal')

form.addEventListener('focus', (e) => {
    e.target.classList.add('on-focus')
}, true)
form.addEventListener('blur', (e) => {
    e.target.classList.remove('on-focus')
}, true)

function isNum(value){
    return !isNaN(value)
}

inputName.addEventListener('input', () => {
    cardName.textContent = inputName.value
    const errorMsg = inputName.nextElementSibling
    const regex = /[0-9]/;

    if(regex.test(inputName.value)) {
        errorMsg.classList.add('active')
        inputName.classList.add('error-state')
        errorMsg.textContent = 'Wrong format, letters only'
    } else {
        errorMsg.classList.remove('active')
        inputName.classList.remove('error-state')
        errorMsg.textContent = ''
    }
    console.log(inputName.value.length)
})

inputNumber.addEventListener('input', () => {
    cardNumber.textContent = inputNumber.value
    const errorMsg = inputNumber.nextElementSibling

    if(!isNum(inputNumber.value.split(" ").join(""))){
        errorMsg.classList.add('active')
        inputNumber.classList.add('error-state')
        errorMsg.textContent = 'Wrong format, numbers only'
    } else if(inputNumber.value == ''){
        cardNumber.textContent = '0000 0000 0000 0000'
        errorMsg.classList.remove('active')
        inputNumber.classList.remove('error-state')
        errorMsg.textContent = ''
    } else {
        errorMsg.classList.remove('active')
        inputNumber.classList.remove('error-state')
        errorMsg.textContent = ''
    }

    const newValue = inputNumber.value.split(" ").join("") 


    inputNumber.value = newValue.match(/.{1,4}/g).join(' ')
})

const month = cardDate.children[0]
const year = cardDate.children[1]

inputMonth.addEventListener('input', () => {
    const errorMsg = inputMonth.nextElementSibling.nextElementSibling
    month.textContent = inputMonth.value

    if(!isNum(inputMonth.value)) {
        errorMsg.classList.add('active')
        inputMonth.classList.add('error-state')
        errorMsg.textContent = 'Numbers only'
    } else if(isNum(inputMonth.value)) {
        inputMonth.classList.remove('error-state')
        if (isNum(inputYear.value) && isNum(inputMonth.value)) {
            errorMsg.classList.remove('active')
            errorMsg.textContent = ''
        }
    }
    
    if(inputMonth.value == '') {
        month.textContent = '00'
        if(inputYear.value == '' && inputMonth.value == '' ) {
            month.textContent = '00'
            errorMsg.classList.remove('active')
            inputYear.classList.remove('error-state')
            inputMonth.classList.remove('error-state')
            errorMsg.textContent = ''
        }
    } 
})

inputYear.addEventListener('input', () => {
    const errorMsg = inputYear.nextElementSibling
    year.textContent = inputYear.value

    if(!isNum(inputYear.value)) {
        errorMsg.classList.add('active')
        inputYear.classList.add('error-state')
        errorMsg.textContent = 'Numbers only'
    } else if(isNum(inputYear.value)) {
        inputYear.classList.remove('error-state')
         if (isNum(inputYear.value) && isNum(inputMonth.value)) {
            errorMsg.classList.remove('active')
            errorMsg.textContent = ''
        }
    } 
    
    if(inputYear.value == '') {
        year.textContent = '00'
        if(inputYear.value == '' && inputMonth.value == '') {
            errorMsg.classList.remove('active')
            inputMonth.classList.remove('error-state')
            inputYear.classList.remove('error-state')
            errorMsg.textContent = ''
        }
    } 
})

inputCvc.addEventListener('input', () => {
    cardCvc.textContent = inputCvc.value
    const errorMsg = inputCvc.nextElementSibling
    
    if(!isNum(inputCvc.value)) {
        errorMsg.classList.add('active')
        inputCvc.classList.add('error-state')
        errorMsg.textContent = 'Wrong format, numbers only'
    } else {
        errorMsg.classList.remove('active')
        inputCvc.classList.remove('error-state')
        errorMsg.textContent = ''
    }
})

submit.addEventListener('click', e => {
    e.preventDefault()
    let error = false

    const inputName = document.forms['form']['name']
    const inputNumber = document.forms['form']['card-number']
    const inputMonth = document.forms['form']['MM']
    const inputYear = document.forms['form']['YY']
    const inputCvc = document.forms['form']['cvc']

    const errorMsgName = inputName.nextElementSibling
    const errorMsgNumber = inputNumber.nextElementSibling
    const errorMsgDate = inputYear.nextElementSibling
    const errorMsgCvc = inputCvc.nextElementSibling
    
    if(isNum(inputName.value)) {
        error = true
    }
    if(!isNum(inputNumber.value.split(" ").join("")) || !isNum(inputMonth.value) || !isNum(inputYear.value) || !isNum(inputCvc.value))  {
        error = true
    }

    if(inputName.value == '') {
        error = true
        errorMsgName.classList.add('active')
        inputName.classList.add('error-state')
        errorMsgName.textContent = "Can't be blank"
    }else if(inputName.value.length < 3) {
        error = true
        errorMsgName.classList.add('active')
        inputName.classList.add('error-state')
        errorMsgName.textContent = 'Name must contain more than 2 characters'
    }

    if(inputNumber.value == '') {
        error = true
        errorMsgNumber.classList.add('active')
        inputNumber.classList.add('error-state')
        errorMsgNumber.textContent = "Can't be blank"
    } else if(inputNumber.value.length > 0 && inputNumber.value.length < 19) {
        error = true
        errorMsgNumber.classList.add('active')
        inputNumber.classList.add('error-state')
        errorMsgNumber.textContent = "enter the 16 numbers on the card"
    }

    if(inputMonth.value == '' || inputYear.value == '' ) {
        error = true
        errorMsgDate.classList.add('active')
        errorMsgDate.textContent = "Can't be blank"
        if(inputMonth.value == ''){
            inputMonth.classList.add('error-state')
        } 
        if(inputYear.value == '') {
            inputYear.classList.add('error-state')
        }
    } else if(inputMonth.value > 12 || inputMonth.value < 1) {
        error = true
        inputMonth.classList.add('error-state')
        errorMsgDate.classList.add('active')
        errorMsgDate.textContent = "Numbers 1 - 12"
    } else if(inputMonth.value.length < 2) {
        error = true
        inputMonth.classList.add('error-state')
        errorMsgDate.classList.add('active')
        errorMsgDate.textContent = 'Invalid format'
    } else if(inputYear.value < 23 || inputYear.value > 99) {
        error = true
        inputYear.classList.add('error-state')
        errorMsgDate.classList.add('active')
        errorMsgDate.textContent = 'Invalid year (23 - 99)'
    }

    if(inputCvc.value == '') {
        error = true
        errorMsgCvc.classList.add('active')
        inputCvc.classList.add('error-state')
        errorMsgCvc.textContent = "Can't be blank"
    } else if(inputCvc.value < 1 || inputCvc.value > 999) {
        error = true
        errorMsgCvc.classList.add('active')
        inputCvc.classList.add('error-state')
        errorMsgCvc.textContent = "Invalid CVC (001 - 999)"
    } else if(inputCvc.value.length < 3) {
        error = true
        errorMsgCvc.classList.add('active')
        inputCvc.classList.add('error-state')
        errorMsgCvc.textContent = "Invalid format"
    }

    if(!error) {
        modal.classList.add('active')
        form.classList.add('hidden')
    }
})

back.addEventListener('click', () => {
    modal.classList.remove('active')
    form.classList.remove('hidden')
    cardNumber.textContent = '0000 0000 0000 0000'
    cardName.textContent = 'jane aplessed'
    month.textContent = '00'
    year.textContent = '00'
    cardCvc.textContent = '000'
    form.reset()
})
