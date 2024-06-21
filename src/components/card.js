const cardTemplate = document.querySelector('#card-template').content;

import { deleteCardRequest, putLikeCard, deleteLikeCard } from "./api";

export function createCard (userData, cardData, isLiked, deleteCallBack, popUpCallBack, likeCallBack) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteCardButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCountElement = cardElement.querySelector('.card__like-count');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardName.textContent = cardData.name;
  likeCountElement.textContent = cardData.likes.length;
  cardImage.addEventListener('click', () => popUpCallBack(cardImage, cardName));
  likeButton.addEventListener('click', likeCallBack(cardData, likeCountElement));
  if (isLiked([userData, cardData])) {
    likeButton.classList.toggle('card__like-button_is-active');
  }
  if (userData._id === cardData.owner._id) {
    deleteCardButton.addEventListener('click', () => deleteCallBack(cardElement, cardData._id));
  } else deleteCardButton.remove();
  return cardElement;
}

export const deleteCard = (item, cardId) => {
  deleteCardRequest(cardId)
  .then (() => {
      item.remove();
  })
  .catch((err) => {
    console.log(err);
  })
};

export const isLikedByUser = ([dataUser, dataCard]) => {
  return dataCard.likes.some((likeInfo) => {
    return likeInfo._id === dataUser._id
  })
  }

export const likeControl = (cardData, likeCountElement) => (evt) => {
  if (evt.target.classList.contains("card__like-button_is-active")) {
    deleteLikeCard(cardData._id)
    .then ((newCardData) => {
      renderLike (evt.target, likeCountElement, newCardData);
    })
    .catch((err) => {
      console.log(err);
    })
  } else {
    putLikeCard(cardData._id)
    .then ((newCardData) => {
      renderLike (evt.target, likeCountElement, newCardData);
    })
    .catch((err) => {
      console.log(err);
    })
  }
};

const renderLike = (element, count, data) => {
  setTimeout (() => {    
    count.textContent = data.likes.length;
  }, 300)
  element.classList.toggle('card__like-button_is-active');
}