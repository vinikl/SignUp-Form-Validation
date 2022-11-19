const inputFields = document.querySelectorAll('[required]')
const password = document.getElementById('user_password')
const password_confirmation = document.getElementById('password_confirmation')
const password_error = document.getElementById('password-error')
const password_error2 = document.getElementById('password-error-2')


for (let input of inputFields) { 
    
    input.addEventListener('invalid', event => { 
        event.preventDefault() // remove the bubble message that appears when a required field is invalid 
        let validation = validateInput(input) // validates the input
        validation()
    })
    input.addEventListener('blur', event => {
        let validation = validateInput(input) // new validation when the input field is not in focus anymore
        validation()
    })
}

function validateInput(input) {

    return function() {
        let error = verifyErrors()

        if (error) { 
            let message = customMessage(error)
            input.style.border = '2px solid rgb(255, 68, 68)'
            input.style.boxShadow = 'none'
            setCustomMessage(message)
        } else {
            input.style.border = '2px solid rgba(0, 225, 255)'
            input.style.boxShadow = '0 0 5px rgba(0, 225, 255)'
            input.style.webkitBoxShadow = '0 0 5px rgba(0, 225, 255), 0 0 0 35px rgba(19, 19, 19, 0.986) inset'
            input.style.webkitTextFillColor = '#fff !important'
            setCustomMessage()
        }

    }

    function verifyErrors() {
        let foundError = false

        for (let errKey in input.validity) { // validity contains boolean properties related to the validity of an input element.
            if (input.validity[errKey] && !input.validity.valid) {
                foundError = errKey
            }
        }

        return foundError
    }

    function customMessage(error) {
        let messages = {
            text: {
                valueMissing: 'Enter your name'
            },
            email: {
                valueMissing: 'Enter your email',
                typeMismatch: 'Invalid email adress, try again'
            },
            password: {
                valueMissing: 'Enter a password',
                tooShort: 'Password must have at least 6 characters'
            }
        }
        return messages[input.type][error]
    }

    function setCustomMessage(message) {
        let spanError = input.parentNode.querySelector('span.error')

        if (message) {
            spanError.classList.add('active')
            spanError.innerHTML = message
        } else {
            spanError.classList.remove('active')
            spanError.innerHTML = ''
        }
    }
}

form.addEventListener('submit', event => {
    let errMsg = []

    if (password.value !== password_confirmation.value) {
        errMsg.push('Password must match')
    } 

    if (errMsg.length > 0) {
        event.preventDefault()
        password_confirmation.style.border = '2px solid rgb(255, 68, 68)'
        password_confirmation.style.boxShadow = 'none'
        password_error2.innerText = errMsg
    } else {
        event.preventDefault()
        let btnMsg = document.getElementById('btn-msg')
        password_error2.classList.remove('active')
        password_error2.innerHTML = ''
        password_confirmation.style.border = '2px solid rgba(0, 225, 255)'
        password_confirmation.style.boxShadow = '0 0 5px rgba(0, 225, 255)'
        btnMsg.classList.add('active')
        btnMsg.innerHTML = 'Account created successfully!'
    }
    
})