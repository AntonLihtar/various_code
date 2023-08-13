let fruits = [
    {
        id: 1,
        title: 'Ананас',
        content: `Тропическое многолетнее травянистое растение до 60 см высотой, с розеткой длинных, узких,
         грубых и в то же время сочных (суккулентных) листьев, зубчатых по краю`,
        price: 300,
        img: 'https://unsplash.com/photos/nAOZCYcLND8/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjkxODQ3MTA5fA&w=6408'
    },
    {
        id: 2,
        title: 'Банан',
        content: `Банан — название съедобных плодов культивируемых растений рода Банан (Musa)`,
        price: 65,
        img: 'https://unsplash.com/photos/0v_1TPz1uXw/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGZydWl0fGVufDB8fHx8MTY5MTgzNjkyOXww&w=640'
    },
    {
        id: 3,
        title: 'Яблоко',
        content: `Яблоко — сочный плод яблони, который употребляется в пищу в свежем и запеченном виде,
         служит сырьём в кулинарии и для приготовления напитков.`,
        price: 120,
        img: 'https://unsplash.com/photos/ngS0S-ZjOpc/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjkxODQ3MjQ5fA&w=640'
    }
]


// const card1 = $.cards(fruits[0])
// const card2 = $.cards(fruits[1])
// const card3 = $.cards(fruits[2])

const toHtml = fruit => `
    <div class="col">
      <div class="card">
        <img src=${fruit.img || ''} class="card-img-top" style="height: 400px" alt="fruit">
        <div class="card-body">
          <h5 class="card-title">${fruit.title || 'fruit'}</h5>
          <p class="card-text">${fruit.content || ''}</p>
          <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
          <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
        </div>
      </div>
    </div>`

function render() {
    const html = fruits.map(toHtml).join('')
    document.querySelector('#fruits').innerHTML = html
}

render()

const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    content: ``,
    width: '400px',
    footerButtons: [
        {
            text: 'Закрыть', type: 'primary', handler() {
                priceModal.close()
            }
        }
    ]
})

// const confirmModal = $.modal({
//     title: 'Вы уверены?',
//     closable: true,
//     width: '400px',
//     footerButtons: [
//         {
//             text: 'Отменить', type: 'secondary', handler() {
//                 confirmModal.close()
//             }
//         },
//         {
//             text: `Удалить`, type: 'danger', handler() {
//                 confirmModal.close()
//             }
//         }
//     ]
// })

//----handler---
document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const targetId = +event.target.dataset.id

    const fruit = fruits.find(f => f.id === targetId)

    if (btnType === 'price') {
        priceModal.setContent(`
        <p>${fruit.title}: <strong>${fruit.price}</strong> руб</p>`)
        priceModal.open()
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`
        }).then(()=>{
            console.log('remove')
            fruits = fruits.filter(f=> f.id !== targetId)
            render()
        }).catch(()=>{
            console.log('cancel')
        })
    }
})

















