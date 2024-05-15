const cardTemplate = document.querySelector('#card-template').content;

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