//класс отвечает за подключение к бд
class ApiService {
  constructor(baseUrl) {
    this.url = baseUrl
  }

  //создаем пост запрос
  async createPost(post) {

    try {
      const request = new Request(this.url + '/posts.json', {
        method: 'post',
        body: JSON.stringify(post)
      })

      return useRequest(request)

    } catch (error) {
      console.error(error);
    }
  }

  //гет запрос //возвращает промис
  async fetchPosts() {
    try {
      const request = new Request(`${this.url}/posts.json`, {
        method: 'get'
      })

      return useRequest(request)

    } catch (error) {
      console.error(error);
    }
  }


  async fetchPostById(id){
    try {
      const request = new Request(`${this.url}/posts/${id}.json`, {
        method: 'get'
      })

      return useRequest(request)

    } catch (error) {
      console.error(error);
    }
  }
}


async function useRequest(request) {
  //фетч принимает строкуб обьект или реквест обьект
  const response = await fetch(request) //ответ на запрос=  Response

  return await response.json() //.json() возвр promise
}

export const apiService = new ApiService('https://micro-blog-js-default-rtdb.europe-west1.firebasedatabase.app/')