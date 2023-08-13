export class TransformService {
    //класс получает обьект c сервера и преобразует в массив обьектов
    static fbObjectToArray(fbData) {
        //получаем массив обьектов с данными и + полем id
        return Object.keys(fbData).map(key => {
            const item = fbData[key]
            item.id = key
            return item
        })
    }
}