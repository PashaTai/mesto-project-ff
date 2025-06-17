import { initialCards } from './cards.js';
import {addCard, likeCard, deleteCard } from './card.js';
import { openModal, closeModal, setCloseListener } from './blocks/modal.js';
import './vendor/normalize.css';
import './vendor/fonts.css';
import './pages/index.css';

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

//Ищу сами попапы
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

//Ищу кнопки открытия попапов
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");

//Ищу форму добавления карточки
const formElementAddCard = popupAddCard.querySelector(".popup__form");
const nameCardInput = formElementAddCard.querySelector(".popup__input_type_card-name");
const linkCardInput = formElementAddCard.querySelector(".popup__input_type_url");

//Ищу форму редактирования профиля
const formElement = popupEditProfile.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

//Ищу Имя и Работу профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//Функция открытия попапd с картинкой
const openImagePopup = (cardData) => {
  if (popupImage) {
    const popupImageImage = popupImage.querySelector(".popup__image");
    const popupCaption = popupImage.querySelector(".popup__caption");
    popupImageImage.src = cardData.link;
    popupImageImage.alt = `На фото ${cardData.name}`;
    popupCaption.textContent = cardData.name;
    openModal(popupImage);
  }
};

//Функция клика для создания карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = nameCardInput.value;
  const link = linkCardInput.value;

  //Добавляем карточку (начало списка)
  const newCardData = {
    name,
    link
  };
  cardList.prepend(addCard(newCardData, cardTemplate, deleteCard, likeCard, openImagePopup));
  closeModal(popupAddCard);

  //Сбрасываем поля
  formElementAddCard.reset();
}

//Функция клика для редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  profileTitle.textContent = name;
  profileDescription.textContent = job;
  closeModal(popupEditProfile);
}



//Cлушатель на кнопку открытия попапа добавления карточки
buttonAddCard.addEventListener("click", function () {
  openModal(popupAddCard);
});

//Слушатель клика для добавления карточки (начало списка)
formElementAddCard.addEventListener("submit", handleAddCardFormSubmit);

//Cлушатели на кнопки открытия попапа редактирования профиля 
buttonEditProfile.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEditProfile);
});

//Слушатель клика для обновления информации профиля
formElement.addEventListener("submit", handleFormSubmit);

// Добавляем все карточки в card.js (конец списка)
initialCards.forEach((cardData) => {
  cardList.append(addCard(cardData, cardTemplate, deleteCard, likeCard, openImagePopup));
});

// Класс анимации ко всем попапам
popupEditProfile.classList.add('popup_is-animated');
popupAddCard.classList.add('popup_is-animated');
popupImage.classList.add('popup_is-animated');

//Закрытие попапов 
setCloseListener(popupEditProfile);
setCloseListener(popupAddCard);
setCloseListener(popupImage);