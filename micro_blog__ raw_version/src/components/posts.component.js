import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { TransformService } from "../services/transform.service";
import { renderPost } from "../templates/post.template";


export class PostsComponent extends Component {
  constructor(id, { loader }) {
    super(id)
    this.loader = loader
  }


  init() {
    this.$el.addEventListener('click', buttonHandler.bind(this))
  }

  async onShow() {
    this.loader.show()
    //делаем запрос ан сервер и получаем обьект
    const fbData = await apiService.fetchPosts()

    //преобразуем обьект в массив обьектов 
    const posts = TransformService.fbObjectToArray(fbData)
    //выведем посты
    const html = posts.map(post => renderPost(post, { withButton: true }))
    this.loader.hide()
    this.$el.insertAdjacentHTML('afterbegin', html.join(' '))
  }

  //когда уходим с вкладки-чистим html(чтобы не дублировать посты)
  onHide() {
    this.$el.innerHTML = ''
  }
}


function buttonHandler(event) {
  const $el = event.target
  const id = $el.dataset.id
  const title = $el.dataset.title

  if (id) {
    //если в локал сторадже нет такой записи вернет пустой массив
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []
    const candidate = favorites.find(p => p.id === id)

    if (candidate) {
      //удалим элемент
      $el.textContent = 'Сохранить'
      $el.classList.add('button-primary')
      $el.classList.remove('button-danger')
      favorites = favorites.filter(p => p.id !== id)
    } else {
      //добавим элемент
      $el.textContent = 'Удалить'
      $el.classList.remove('button-primary')
      $el.classList.add('button-danger')

      favorites.push({id, title})
    }

    //добавляем запись
    // localStorage.setItem('favorites', JSON.stringify(favorites))
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }
}