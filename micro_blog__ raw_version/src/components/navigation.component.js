import { Component } from "../core/component"

export class NavigationComponent extends Component {
    constructor(id) {
        super(id)

        this.tabs = []
    }
    init() {
        this.$el.addEventListener('click', tabClickHandler.bind(this))
    }

    registerTabs(tabs) {
        this.tabs = tabs
    }

}

function tabClickHandler(event) {
    event.preventDefault()
    if (event.target.classList.contains('tab')) {

        this.$el.querySelectorAll('.tab').forEach(element => {
            element.classList.remove('active')
        });

        event.target.classList.add('active')
    }

    //сравнивает дата атрибут и элемент в массиве , выводит элементмассива
    // по нажатию на элемент с таким дата атрибутом
    const activeTab = this.tabs.find(t => t.name === event.target.dataset.name)

    //скрываем все табы
    this.tabs.forEach(el => el.component.hide())

    //показываем элемент с которым связан таб
    activeTab.component.show()
}