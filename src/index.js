import './pages/index.css';
import { createCard, deleteCard, isLikedByUser, likeControl } from './components/card.js';
import { openModal, closeModal, } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getData, patchProfile, patchAvatar, postNewCard } from './components/api.js'

const cardContainer = document.querySelector('.places__list');
const editAvatarForm = document.querySelector('.popup_avatar_edit')
const editProfileForm = document.querySelector('.popup_type_edit');
const addCardForm = document.querySelector('.popup_type_new-card');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
export const closePopUpButton = document.querySelector('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const formAvatar = document.forms['edit-avatar'];
const formAvatarButtonSubmit = formAvatar.querySelector('.popup__button');
const formAvatarInputLink = formAvatar.elements.link;
const formProfile = document.forms['edit-profile'];
const formProfileInputName = formProfile.elements.name;
const formProfileInputJob = formProfile.elements.description;
const formProfileButtonSubmit = formProfile.querySelector('.popup__button');
const formNewPlace = document.forms['new-place'];
const formNewPlaceName = formNewPlace.elements['place-name'];
const formNewPlaceLink = formNewPlace.elements.link;
const formNewPlaceButtonSubmit = formNewPlace.querySelector('.popup__button');
const imagePopUp = document.querySelector('.popup_type_image');
const imagePopUpImage = document.querySelector('.popup__image');
const imagePopUpText = document.querySelector('.popup__caption');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};


profileAvatar.addEventListener('click', () => {
  clearValidation (editAvatarForm, validationConfig);  
  openModal(editAvatarForm);
})

const newAvatar = (evt) => {
  formAvatarButtonSubmit.textContent = 'Сохранение...';
  evt.preventDefault();
  const linkNewAvatar = formAvatarInputLink.value;
  patchAvatar(linkNewAvatar)
  .then ((data) => {
    profileAvatar.style.backgroundImage = `url(${data.avatar})`;    
    closeModal(editAvatarForm);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally (()=> {
    evt.target.reset();
    formProfileButtonSubmit.textContent = 'Сохранить';
  }) 
}

formAvatar.addEventListener('submit', newAvatar);

editProfileButton.addEventListener('click', () => {
  formProfileInputName.value = profileTitle.textContent;
  formProfileInputJob.value = profileDescription.textContent;
  clearValidation (editProfileForm, validationConfig);  
  openModal(editProfileForm);
});

function profileEditFormSubmit(evt) {
  formProfileButtonSubmit.textContent = 'Сохранение...';
  evt.preventDefault();
  const dataUserNew = {
  name: formProfileInputName.value,
  about: formProfileInputJob.value
  }
  patchProfile(dataUserNew)
  .then ((data) => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;    
    closeModal(editProfileForm);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally (()=> {
    formProfileButtonSubmit.textContent = 'Сохранить';
  })  
};

formProfile.addEventListener('submit', profileEditFormSubmit);

addCardButton.addEventListener('click', () => {
  openModal(addCardForm);
  clearValidation (addCardForm, validationConfig);
});

function addCard (evt) {
  evt.preventDefault();
  formNewPlaceButtonSubmit.textContent = 'Создание...'
  const newCardData = {};
  newCardData.name = formNewPlaceName.value;
  newCardData.link = formNewPlaceLink.value;
  postNewCard(newCardData)
  .then ((data) => {
    const cardElement = createCard(data.owner, data, isLikedByUser, deleteCard, openPopUpImage, likeControl);
    cardContainer.prepend(cardElement);    
    closeModal(addCardForm);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally (() => {
    formNewPlaceButtonSubmit.textContent = 'Создать'
    evt.target.reset();
  })
};

formNewPlace.addEventListener('submit', addCard);

function openPopUpImage (image, text) {
  openModal(imagePopUp);
  imagePopUpImage.src = image.src;
  imagePopUpImage.alt = image.alt;
  imagePopUpText.textContent = text.textContent;
};

const renderData = () => {
getData()
.then(([dataUser, dataCards]) => {
  profileTitle.textContent = dataUser.name;
  profileDescription.textContent = dataUser.about;
  profileAvatar.style.backgroundImage = `url(${dataUser.avatar})`;
  dataCards.forEach( (card) => {
    const cardElement = createCard(dataUser, card, isLikedByUser, deleteCard, openPopUpImage, likeControl);
    cardContainer.append(cardElement);
  })
})
.catch((err) => {
  console.log(err);
});
};

enableValidation(validationConfig);
renderData();