function _createCards(options) {
    const card = document.createElement('div')
    card.classList.add('col')
    const html = `
    <div class="col">
      <div class="card">
        <img
          src=${options.img || ''}
          class="card-img-top"
          style="height: 400px"
          alt="fruit">
        <div class="card-body">
          <h5 class="card-title">${options.title || 'fruit'}</h5>
          <p class="card-text">${options.content || ''}</p>
          <a href="#" class="btn btn-primary">Посмотреть цену</a>
          <a href="#" class="btn btn-danger">Удалить</a>
        </div>
      </div>
    </div>`

    card.insertAdjacentHTML('afterbegin', html)

    document.querySelector('.row').append(card)
    return card
}

$.cards = function (options) {
    let $card = _createCards(options)
    let destroyed = false

    const objCard = {
        show() {
            $card.style.display = 'block'
        },
        hide() {
            $card.style.display = 'none'
        },
        destroy() {
            $card.parentNode.removeChild($card)
            $card.removeEventListener('click', btnPrimaryHandler)
            destroyed = true
        }
    }
    //--------btn handlers-------
    function btnPrimaryHandler(event) {

        const fruit = options.title || 'фрукт'

        const primaryModal = $.modal({
            title: `${fruit}`,
            closable: false,
            content: `Цена за 1кг: ${options.price || 0} рублей`,
            width: '400px',
            footerButtons: [
                {
                    text: 'Ok', type: 'primary', handler() {
                        primaryModal.close()
                    }
                }
            ]
        })

        const dangerModal = $.modal({
            title: `${fruit}`,
            closable: false,
            content: `Удалить ${fruit}?`,
            width: '400px',
            footerButtons: [
                {
                    text: 'Отмена', type: 'primary', handler() {
                        console.log('primary btn click')
                        dangerModal.close()
                    }
                },
                {
                    text: `Удалить`, type: 'danger', handler() {
                        console.log('Danger btn click')

                        dangerModal.close()
                        objCard.destroy()
                    }
                }
            ]
        })

        if (event.target.classList.contains('btn-primary')) {
            event.preventDefault()
            primaryModal.open()
        }
        if (event.target.classList.contains('btn-danger')) {
            event.preventDefault()
            dangerModal.open()
        }
    }


    $card.addEventListener('click', btnPrimaryHandler)


    return objCard
}