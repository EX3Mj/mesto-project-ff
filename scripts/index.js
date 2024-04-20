// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard (cardData, deleteCallBack) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteCardButton = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  deleteCardButton.addEventListener('click', () => deleteCallBack(cardElement));
  return cardElement;
}

function deleteCard (item) {
  item.remove();
}

initialCards.forEach(item => {
  const cardElement = createCard(item, deleteCard);
  cardContainer.append(cardElement);
});