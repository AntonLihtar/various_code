Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}
function noop(){
    console.log('btn no work. This noop')
}

function _createModalFooter(buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div')
    }

    const wrap = document.createElement(('div'))
    wrap.classList.add('modal-footer')

    buttons.forEach(btn => {
        const $btn = document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)
        $btn.onclick = btn.handler || noop

        wrap.appendChild($btn)
    })


    return wrap
}

function _createModal(options) {
    const DEFAULT_WIDTH = '600px'
    const modal = document.createElement('div')
    modal.classList.add('amodal')

    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay" data-close="true">
            <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
                <div class="modal-header">
                    <span class="modal-title">${options.title || ' Окно'}</span>
                    ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
                </div>
                <div class="modal-body" data-content>
                    ${options.content || ''}
                </div>
            </div>
        </div>
    `)

    const footer = _createModalFooter(options.footerButtons)
    footer.appendAfter(modal.querySelector('[data-content]'))
    document.body.appendChild(modal)
    return modal
}


$.modal = function (options) {
    const ANIMATION_SPEED = 300
    let $modal = _createModal(options) //дестрой удаляет его
    let isClosing = false
    let destroyed = false

    //-----return Object------
    const modal = {
        open() {
            if (destroyed) {
                return console.log('Modal is destroyed')
            }
            !isClosing && $modal.classList.add('open')
            onOpen()
        },
        close() {
            isClosing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                isClosing = false
                if(typeof options.onClose === 'function'){
                    options.onClose()
                }
            }, ANIMATION_SPEED)
            onClose()
        }
    }

    //------handler-----
    $modal.addEventListener('click', closeModal)

    function closeModal(event) {
        if (event.target.dataset.close) {
            modal.close()
        }
    }

    let flag = false

    function onOpen() {
        console.log('onOpen')
    }

    function onClose() {
        console.log('onClose')
        flag = true
    }


    function beforeClose() {
        return flag
    }


    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('click', closeModal)
            destroyed = true
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
        }
    })
}