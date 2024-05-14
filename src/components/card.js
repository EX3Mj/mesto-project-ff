import { openModal } from "./modal";
import { cardTemplate } from "..";

export function createCard (cardData, deleteCallBack, popUpCallBack, likeCallBack) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteCardButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardName.textContent = cardData.name;
  deleteCardButton.addEventListener('click', () => deleteCallBack(cardElement));
  cardImage.addEventListener('click', () => popUpCallBack(cardImage, cardName));
  likeButton.addEventListener('click', () => likeCallBack(likeButton));
  return cardElement;
}

export function deleteCard (item) {
  item.remove();
};

export function openPopUpImage (image, text) {
  const imagePopUp = document.querySelector('.popup_type_image');
  const imagePopUpImage = document.querySelector('.popup__image');
  const imagePopUpText = document.querySelector('.popup__caption');
  openModal(imagePopUp);
  imagePopUpImage.src = image.src;
  imagePopUpImage.alt = image.alt;
  imagePopUpText.textContent = text.textContent;
  document.addEventListener('keydown', closeModalEsc);
};

export function likeControl (item) {
  console.log(item);
  item.classList.toggle('card__like-button_is-active');
};