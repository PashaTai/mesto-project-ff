export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', escClose);
}

export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', escClose);
}

function escClose(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        if (popup) {
            closeModal(popup);
        }
    }
}

export function setCloseListener(popup) {
    const closeButton = popup.querySelector('.popup__close');
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            closeModal(popup);
        });
    }

    popup.addEventListener('mousedown', function (evt) {
        if (evt.target === evt.currentTarget) {
            closeModal(popup);
        }
    });
}


