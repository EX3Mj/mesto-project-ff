import './pages/index.css';
import { createCard, deleteCard, openPopUpImage, likeControl } from './components/card.js';
import { initialCards } from './components/cards.js'
import { openModal, closeModal, closeModalOverlay, closeModalEsc } from './components/modal.js';

export const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');
export const popUpElements = document.querySelectorAll('.popup');
const editProfileForm = document.querySelector('.popup_type_edit');
const addCardForm = document.querySelector('.popup_type_new-card');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const closePopUpButtons = document.querySelectorAll('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formProfile = document.forms['edit-profile'];
const formProfileInputName = formProfile.elements.name;
const formProfileInputJob = formProfile.elements.description;
const formNewPlace = document.forms['new-place'];
const formNewPlaceName = formNewPlace.elements['place-name'];
const formNewPlaceLink = formNewPlace.elements.link;

editProfileButton.addEventListener('click', () => {
  openModal(editProfileForm);
  formProfileInputName.value = profileTitle.textContent;
  formProfileInputJob.value = profileDescription.textContent;
  document.addEventListener('keydown', closeModalEsc);
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = formProfileInputName.value;
  profileDescription.textContent = formProfileInputJob.value;
  closeModal(popUpElements);
};

formProfile.addEventListener('submit', handleFormSubmit);

addCardButton.addEventListener('click', () => {
  openModal(addCardForm);
  document.addEventListener('keydown', closeModalEsc);
});

function addCard (evt) {
  evt.preventDefault();
  const newCardData = [];
  newCardData.name = formNewPlaceName.value;
  newCardData.link = formNewPlaceLink.value;
  const cardElement = createCard(newCardData, deleteCard, openPopUpImage, likeControl);
  closeModal(popUpElements);
  formNewPlaceName.value = "";
  formNewPlaceLink.value = "";
  cardContainer.prepend(cardElement);
};

formNewPlace.addEventListener('submit', addCard);

closePopUpButtons.forEach(item => {
  item.addEventListener('click', () => {
    closeModal(popUpElements);
  });
});

initialCards.forEach(item => {
  const cardElement = createCard(item, deleteCard, openPopUpImage, likeControl);
  cardContainer.append(cardElement);
});

popUpElements.forEach(item => {
  closeModalOverlay(item);
});



