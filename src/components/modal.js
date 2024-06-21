export function openModal (element) {
  element.classList.add('popup_is-animated');    
  setTimeout(() => {
    element.classList.add('popup_is-opened');
  });  
  document.addEventListener('keydown', closeModalEsc);
  element.addEventListener('click', closeModalByClick);
}

export function closeModal (element) {
  element.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalEsc);
  element.removeEventListener('click', closeModalByClick);
};

function closeModalByClick(evt) {
  if (
    evt.target.classList.contains('popup__close') ||
    evt.target === evt.currentTarget
) {
    closeModal(evt.currentTarget);
  }
}

function closeModalEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopUp = document.querySelector('.popup_is-opened')
    closeModal(openedPopUp);
  };
};