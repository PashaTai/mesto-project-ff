import { createCard, likeCard } from './components/card.js';
import { openModal, closeModal, setCloseListener } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, updateProfile, addCard, deleteCardFromServer, likeCard as likeCardApi, unlikeCard, updateAvatar } from './components/api.js';
import './vendor/normalize.css';
import './vendor/fonts.css';
import './pages/index.css';

// Validation config
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

// Popups
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupCreateCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupDeleteCard = document.querySelector(".popup_type_delete");

// Buttons
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonCreateCard = document.querySelector(".profile__add-button");
const buttonEditAvatar = document.querySelector(".profile__avatar-edit-button");

// Forms
const formCreateCard = popupCreateCard.querySelector(".popup__form");
const nameCardInput = formCreateCard.querySelector(".popup__input_type_card-name");
const linkCardInput = formCreateCard.querySelector(".popup__input_type_url");

const formEditProfile = popupEditProfile.querySelector(".popup__form");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");

const formAvatar = popupAvatar.querySelector(".popup__form");
const avatarInput = formAvatar.querySelector(".popup__input_type_avatar");

const formDeleteCard = popupDeleteCard.querySelector(".popup__form");

// Profile elements
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const popupImageElement = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

let userId;
let cardToDelete = null;
let cardIdToDelete = null;

function loadInitialData() {
  Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cardsData]) => {
      userId = userData._id;
      
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileImage.style.backgroundImage = `url('${userData.avatar}')`;
      
      cardsData.forEach((cardData) => {
        cardList.append(createCard(cardData, cardTemplate, openDeleteCardPopup, likeCard, openImagePopup, userId));
      });
    })
    .catch((err) => {});
}

const openImagePopup = (cardData) => {
  if (popupImage) {
    popupImageElement.src = cardData.link;
    popupImageElement.alt = `На фото ${cardData.name}`;
    popupImageCaption.textContent = cardData.name;
    openModal(popupImage);
  }
};

function handleCreateCardFormSubmit(evt) {
  evt.preventDefault();
  const name = nameCardInput.value;
  const link = linkCardInput.value;
  
  const submitButton = evt.target.querySelector('.popup__button');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  addCard(name, link)
    .then((newCard) => {
      cardList.prepend(createCard(newCard, cardTemplate, openDeleteCardPopup, likeCard, openImagePopup, userId));
      closeModal(popupCreateCard);
      formCreateCard.reset();
      clearValidation(formCreateCard, validationConfig);
    })
    .catch((err) => {})
    .finally(() => {
      submitButton.textContent = originalText;
    });
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  
  const submitButton = evt.target.querySelector('.popup__button');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  updateProfile(name, job)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(popupEditProfile);
    })
    .catch((err) => {})
    .finally(() => {
      submitButton.textContent = originalText;
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatar = avatarInput.value;
  
  const submitButton = evt.target.querySelector('.popup__button');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  updateAvatar(avatar)
    .then((userData) => {
      profileImage.style.backgroundImage = `url('${userData.avatar}')`;
      closeModal(popupAvatar);
      formAvatar.reset();
      clearValidation(formAvatar, validationConfig);
    })
    .catch((err) => {})
    .finally(() => {
      submitButton.textContent = originalText;
    });
}

function handleDeleteCardFormSubmit(evt) {
  evt.preventDefault();
  
  if (!cardToDelete || !cardIdToDelete) return;
  
  const submitButton = evt.target.querySelector('.popup__button');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Удаление...';
  submitButton.disabled = true;

  deleteCardFromServer(cardIdToDelete)
    .then(() => {
      cardToDelete.remove();
      closeModal(popupDeleteCard);
      cardToDelete = null;
      cardIdToDelete = null;
    })
    .catch((err) => {})
    .finally(() => {
      submitButton.textContent = originalText;
    });
}

function openDeleteCardPopup(cardElement, cardId) {
  cardToDelete = cardElement;
  cardIdToDelete = cardId;
  openModal(popupDeleteCard);
}

// Event listeners
buttonCreateCard.addEventListener("click", function () {
  openModal(popupCreateCard);
});

buttonEditAvatar.addEventListener("click", function () {
  openModal(popupAvatar);
});

formCreateCard.addEventListener("submit", handleCreateCardFormSubmit);

buttonEditProfile.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openModal(popupEditProfile);
});

formEditProfile.addEventListener("submit", handleEditProfileFormSubmit);
formAvatar.addEventListener("submit", handleAvatarFormSubmit);
formDeleteCard.addEventListener("submit", handleDeleteCardFormSubmit);

// Init popups
popupEditProfile.classList.add('popup_is-animated');
popupCreateCard.classList.add('popup_is-animated');
popupImage.classList.add('popup_is-animated');
popupAvatar.classList.add('popup_is-animated');
popupDeleteCard.classList.add('popup_is-animated');

setCloseListener(popupEditProfile);
setCloseListener(popupCreateCard);
setCloseListener(popupImage);
setCloseListener(popupAvatar);
setCloseListener(popupDeleteCard);

enableValidation(validationConfig);
loadInitialData();