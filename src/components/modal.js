import { popUpElements } from "..";

export function openModal (element) {
  element.classList.add('popup_is-animated');
  setTimeout(() => {
    element.classList.add('popup_is-opened');
  });
}

export function closeModal (element) {
  element.forEach(item => {
    item.classList.remove('popup_is-opened');
  });
};

export function closeModalOverlay(element) {
  element.addEventListener('click', (evt) => {
    if (element === evt.target) {
      closeModal(popUpElements);
    }
});
};

export function closeModalEsc(evt) {
  if (evt.key === 'Escape') {
  closeModal(popUpElements);
  };
  document.removeEventListener('keydown', closeModalEsc);
};