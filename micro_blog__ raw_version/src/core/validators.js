export class Validators {
    static required(value = '') {
        return value && value.trim()
    }

    //используем замыкание чтобы передать длину в функцию
    static minLength(length) {
        return value => {
            return value && value.length >= length
        }
    }
}