import { Component } from "../core/component"
import { Form } from "../core/form"
import { Validators } from "../core/validators"
import { apiService } from "../services/api.service"

export class CreateComponent extends Component {
    constructor(id) {
        super(id)
    }
    init() {
        this.form = new Form(this.$el, {
            title: [Validators.required],
            fulltext: [Validators.minLength(10)] //устанавливаем мин кол символов
        })

        //вешаем обработчик формы
        this.$el.addEventListener('submit', submitHandler.bind(this))

    }
}


async function submitHandler(event) {
    event.preventDefault()

    if (this.form.isValid()) {
        //элемент в родителе с именем type

        const formData = {
            //получаем селект
            type: this.$el.type.value,
            date: new Date().toLocaleDateString(), //текущая дата
            ...this.form.value()
        }

        //отправляем данные на серв
        await apiService.createPost(formData)

        this.form.clear() //чистим форму

        alert('Данные отправлены в базу данных')
    }
}