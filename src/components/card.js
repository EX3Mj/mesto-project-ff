const cardTemplate = document.querySelector('#card-template').content;

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
  likeButton.addEventListener('click', (evt) => likeCallBack(likeCountElement, likeButton, isLiked, cardData._id));
  if (isLiked([userData, cardData])) {
    likeButton.classList.add('card__like-button_is-active');
  }
  if (userData._id === cardData.owner._id) {
    deleteCardButton.addEventListener('click', () => deleteCallBack(cardElement, cardData._id));
  } else deleteCardButton.remove();
  return cardElement;
}