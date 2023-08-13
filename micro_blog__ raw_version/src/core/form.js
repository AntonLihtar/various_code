export class Form {
    constructor(form, controls) {
        this.form = form
        this.controls = controls //обьект с инпутами формы
    }

    value() {
        const value = {}
        //пробегаем по всем инпутам формы и записываем их и их значение в обьект
        Object.keys(this.controls).forEach(control => {

            //берем название и записываем его и значение =ищем в форме по названию 
            value[control] = this.form[control].value
        })
        return value
    }

    clear() {
        //очищаем форму
        Object.keys(this.controls).forEach(control => {

            //берем название и записываем его и значение 
            this.form[control].value = ''
        })
    }

    isValid() {
        let isFormValid = true

        Object.keys(this.controls).forEach(control => {
            //получаем массив валидаторов для каждого  элемента 
            const validators = this.controls[control]

            //создаем переменную для проверки на валидность элемента
            let isValid = true
            validators.forEach(validator => {
                //проверяем в каждом валидаторе поле формы(и если каждой валидатор прошел проверку)
                isValid = validator(this.form[control].value) && isValid
            })

            //для невалидных инпутов показываем  этот инпут 
            isValid ? clearError(this.form[control]) : setError(this.form[control])

            //устанавливаем значение для всех валидаторов 
            isFormValid = isFormValid && isValid
        })

        return isFormValid
    }
}

function setError($control) {
    clearError($control)
    console.log($control.name);
    let error = '<p class="validation-error">Введите корректное значение</p>'
    
    if($control.name === 'fulltext'){
        error = '<p class="validation-error">Длина текста должны быть не меньше 10 символов</p>'
    }
    
    $control.classList.add('invalid')
    $control.insertAdjacentHTML('afterend', error)
}

function clearError($control) {
    $control.classList.remove('invalid')

    if ($control.nextSibling) {
        $control.closest('.form-control').removeChild($control.nextSibling)
    }


}

