// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function cards(cardsList) {
  cardsList.forEach(function(item) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteCardButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;
    console.log(cardElement);
    deleteCardButton.addEventListener('click', function() {
      cardElement.remove();
    });
    cardContainer.append(cardElement);
  });
}

cards(initialCards);