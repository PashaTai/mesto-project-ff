import { initialCards } from './components/cards.js';
import {createCard, likeCard, deleteCard } from './components/card.js';
import { openModal, closeModal, setCloseListener } from './components/modal.js';
import './vendor/normalize.css';
import './vendor/fonts.css';
import './pages/index.css';

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

//Ищу сами попапы
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupCreateCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

//Ищу кнопки открытия попапов
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonCreateCard = document.querySelector(".profile__add-button");

//Ищу форму добавления карточки
const formCreateCard = popupCreateCard.querySelector(".popup__form");
const nameCardInput = formCreateCard.querySelector(".popup__input_type_card-name");
const linkCardInput = formCreateCard.querySelector(".popup__input_type_url");

//Ищу форму редактирования профиля
const formEditProfile = popupEditProfile.querySelector(".popup__form");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");

//Ищу Имя и Работу профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popupImageElement = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

//Функция открытия попапd с картинкой
const openImagePopup = (cardData) => {
  if (popupImage) {
    popupImageElement.src = cardData.link;
    popupImageElement.alt = `На фото ${cardData.name}`;
    popupImageCaption.textContent = cardData.name;
    openModal(popupImage);
  }
};

//Функция клика для создания карточки
function handleCreateCardFormSubmit(evt) {
  evt.preventDefault();
  const name = nameCardInput.value;
  const link = linkCardInput.value;

  //Добавляем карточку (начало списка)
  const newCardData = {
    name,
    link
  };
  cardList.prepend(createCard(newCardData, cardTemplate, deleteCard, likeCard, openImagePopup));
  closeModal(popupCreateCard);

  //Сбрасываем поля
  formCreateCard.reset();
}

//Функция клика для редактирования профиля
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  profileTitle.textContent = name;
  profileDescription.textContent = job;
  closeModal(popupEditProfile);
}



//Cлушатель на кнопку открытия попапа добавления карточки
buttonCreateCard.addEventListener("click", function () {
  openModal(popupCreateCard);
});

//Слушатель клика для добавления карточки (начало списка)
formCreateCard.addEventListener("submit", handleCreateCardFormSubmit);

//Cлушатели на кнопки открытия попапа редактирования профиля 
buttonEditProfile.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEditProfile);
});

//Слушатель клика для обновления информации профиля
formEditProfile.addEventListener("submit", handleEditProfileFormSubmit);

// Добавляем все карточки в card.js (конец списка)
initialCards.forEach((cardData) => {
  cardList.append(createCard(cardData, cardTemplate, deleteCard, likeCard, openImagePopup));
});

// Класс анимации ко всем попапам
popupEditProfile.classList.add('popup_is-animated');
popupCreateCard.classList.add('popup_is-animated');
popupImage.classList.add('popup_is-animated');

//Закрытие попапов 
setCloseListener(popupEditProfile);
setCloseListener(popupCreateCard);
setCloseListener(popupImage);