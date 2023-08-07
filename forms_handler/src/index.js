class Form {
    //нужен для формирования ответа(обьекта) серверу из данных взятых с полей формы
    constructor(form, controls) {

        //принимем и сохраняем форму
        this.form = form

        //сохраняем имена инпутов формы {type: [validator]}
        this.controls = controls
    }

    value() {
        //метод получаеТ селекты и инпуты(инпуты берутся )
        this.data = {}

        //получаем все элементы формы
        this.arrElements = Array.from(this.form.elements)

        //получаем селекты из формы если есть и добавляем в объект
        const selects = this.arrElements.filter(el => el.tagName === "SELECT")
        selects.forEach(el => {
            this.data[el.name] = el.value
        })

        //список инпутов из формы(получаем лишь ключи)
        let arrKey = Object.keys(this.controls)

        //проходим по ключам и получаем значения с формы в data
        arrKey.forEach(el => {
            this.data[el] = this.form[el].value
        })

        return this.data
    }

    clearInput() {
        //фильтруем поля формы и чистим
        const a = this.arrElements.filter(el => el.tagName === 'INPUT')
        a.forEach(el2 => el2.value = '')
    }

    addAnswer() {
        //показываем пользователю что данные отправлены
        const answ = this.form.querySelector('.answer')
  
        answ.classList.remove('hide')
        //после 5 сек скрывается запись
        setTimeout(()=>{
            answ.classList.add('hide')
        }, 5000)
    }
}

//класс работает с формой
class FormComponent {
    //принимает селектор
    constructor(id) {
        this.$el = document.getElementById(id)
        this.init()
    }
    init() {
        //формируем для каждой формы свои поля и массив валидаторов(изначально валидаторов нет)
        //ПРИ ДОБАВЛЕНИИ В ФОРМЫ НОВЫХ input полей или добавлении новых ФОРМ, ДОБАВИТЬ В ЭТОТ МАССИВ type полей
        this.controls = {
            form1: { name: [], surname: [], age: [] },
            form2: { hobbies: [] }
        }

        //обработчик на форму
        this.$el.addEventListener('submit', submitHandler.bind(this))
    }
}

function submitHandler(event) {
    //отключаем стандартное поведение
    event.preventDefault()

    const f = new Form(this.$el, this.controls[this.$el.id])
    //получаем данные полей формы
    const dataForm = f.value()
    //--------можем отправлять на сервер данные JSON---------
    console.log('DATA: ', JSON.stringify(dataForm));

    //чистим инпуты
    f.clearInput()
    f.addAnswer()
}

//инициализируем формы
new FormComponent('form1')
new FormComponent('form2')