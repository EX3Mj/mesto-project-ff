import './pages/index.css';
import { createCard, deleteCard, } from './components/card.js';
import { initialCards } from './components/cards.js'
import { openModal, closeModal, closeModalOverlay, } from './components/modal.js';

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
const imagePopUp = document.querySelector('.popup_type_image');
const imagePopUpImage = document.querySelector('.popup__image');
const imagePopUpText = document.querySelector('.popup__caption');

editProfileButton.addEventListener('click', () => {
  openModal(editProfileForm);
  formProfileInputName.value = profileTitle.textContent;
  formProfileInputJob.value = profileDescription.textContent;
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
});

function addCard (evt) {
  evt.preventDefault();
  const newCardData = [];
  newCardData.name = formNewPlaceName.value;
  newCardData.link = formNewPlaceLink.value;
  const cardElement = createCard(newCardData, deleteCard, openPopUpImage, likeControl);
  closeModal(popUpElements);
  evt.target.reset();
  cardContainer.prepend(cardElement);
};

formNewPlace.addEventListener('submit', addCard);

function openPopUpImage (image, text) {
  openModal(imagePopUp);
  imagePopUpImage.src = image.src;
  imagePopUpImage.alt = image.alt;
  imagePopUpText.textContent = text.textContent;
};

function likeControl (item) {
  console.log(item);
  item.classList.toggle('card__like-button_is-active');
};

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



