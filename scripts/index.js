
const cardTemplate = document.querySelector('#card-template').content;


function addCard (cardData, functionDeleteCardCallBack) {
  const cardElement = cardTemplate.querySelector('li').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = `На фото ${cardData.name}`;

  const deleteCardButton = cardElement.querySelector('.card__delete-button');
  deleteCardButton.addEventListener('click', () => {functionDeleteCardCallBack(cardElement)} );

  return cardElement;
} 

const deleteCard = (cardElement) => {
  cardElement.remove();
}

const cardList = document.querySelector('.places__list');

initialCards.forEach((cardData) => {
    
  cardList.append(addCard(cardData, deleteCard));
})





