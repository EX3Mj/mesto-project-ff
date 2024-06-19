import './pages/index.css';
import { createCard } from './components/card.js';
import { openModal, closeModal, closeModalOverlay, } from './components/modal.js';
import { validationConfig, enableValidation, clearValidation } from './components/validation.js';
import { getData, patchProfile, patchAvatar, postNewCard, deleteCardRequest, putLikeCard, deleteLikeCard } from './components/api.js'

const cardContainer = document.querySelector('.places__list');
export const popUpElements = document.querySelectorAll('.popup');
const editAvatarForm = document.querySelector('.popup_avatar_edit')
const editProfileForm = document.querySelector('.popup_type_edit');
const addCardForm = document.querySelector('.popup_type_new-card');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const closePopUpButtons = document.querySelectorAll('.popup__close');
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
  })
  .catch((err) => {
    console.log(err);
  })
  .finally (()=> {
    evt.target.reset();
    closeModal(popUpElements);
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

function handleFormSubmit(evt) {
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
  })
  .catch((err) => {
    console.log(err);
  })
  .finally (()=> {
    closeModal(popUpElements);
    formProfileButtonSubmit.textContent = 'Сохранить';
  })  
};

formProfile.addEventListener('submit', handleFormSubmit);

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
    return createCard(data.owner, data, deleteCard, openPopUpImage, likeControl);
  })
  .then((cardElement) => {
    cardContainer.prepend(cardElement);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally (() => {
    closeModal(popUpElements);
    formNewPlaceButtonSubmit.textContent = 'Создать'
    evt.target.reset();
  })
};

formNewPlace.addEventListener('submit', addCard);

const deleteCard = (item, cardId) => {
  deleteCardRequest(cardId)
  .catch((err) => {
    console.log(err);
  })
  .finally (() =>{
    item.remove();
  })
};

function openPopUpImage (image, text) {
  openModal(imagePopUp);
  imagePopUpImage.src = image.src;
  imagePopUpImage.alt = image.alt;
  imagePopUpText.textContent = text.textContent;
};

function isLikedByUser ([dataUser, dataCard]) {
return dataCard.likes.some((likeInfo) => {
  return likeInfo._id === dataUser._id
})
}

function likeControl (countLikeElement, likeElement, isLiked, initialCardId) {
  getData()
  .then(([dataUser, dataCards]) => {
      const dataCardUsersLikes = {};
      dataCards.forEach((cardInfo) => {
      if (cardInfo._id === initialCardId) {
        dataCardUsersLikes.likes = cardInfo.likes;
      }
      })
      if (isLiked([dataUser, dataCardUsersLikes])) {
        return deleteLikeCard(initialCardId);
      } else {
        return putLikeCard(initialCardId);
      }
  })
  .then((newDataCard) => {
    likeElement.classList.toggle('card__like-button_is-active');
    setTimeout(() => {
      countLikeElement.textContent = newDataCard.likes.length;
    }, 300)
  })
  .catch((err) => {
    console.log(err);
  });
};

closePopUpButtons.forEach(item => {
  item.addEventListener('click', () => {
    closeModal(popUpElements);
  });
});

popUpElements.forEach(item => {
  closeModalOverlay(item);
});

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