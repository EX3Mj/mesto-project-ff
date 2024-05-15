import { popUpElements } from "..";

export function openModal (element) {
  element.classList.add('popup_is-animated');
  setTimeout(() => {
    element.classList.add('popup_is-opened');
  });  
  document.addEventListener('keydown', closeModalEsc);
}

export function closeModal (element) {
  element.forEach(item => {
    item.classList.remove('popup_is-opened');
  });  
  document.removeEventListener('keydown', closeModalEsc);
};

export function closeModalOverlay(element) {
  element.addEventListener('click', (evt) => {
    if (element === evt.target) {
      closeModal(popUpElements);
    }
});
};

function closeModalEsc(evt) {
  if (evt.key === 'Escape') {
  closeModal(popUpElements);
  };
};