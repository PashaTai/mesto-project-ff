const cardTemplate = document.querySelector("#card-template").content;

function addCard(cardData, functionDeleteCardCallBack) {
  const cardElement = cardTemplate.querySelector("li").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = `На фото ${cardData.name}`;

  const deleteCardButton = cardElement.querySelector(".card__delete-button");
  deleteCardButton.addEventListener("click", () => {
    functionDeleteCardCallBack(cardElement);
  });

  return cardElement;
}

const deleteCard = (cardElement) => {
  cardElement.remove();
};

const cardList = document.querySelector(".places__list");

initialCards.forEach((cardData) => {
  cardList.append(addCard(cardData, deleteCard));
});
