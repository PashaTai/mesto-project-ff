//Удаление карточки
export const deleteCard = (cardElement) => {
    cardElement.remove();
  };
  
  //Лайк карточки
  export const likeCard = (likeButton) => {
    likeButton.classList.toggle("card__like-button_is-active")
  };
  
  //Создание карточки
  export function addCard(cardData, cardTemplate, functionDeleteCardCallBack, functionLikeCardCallBack, functionOpenImageCallBack) {
    const cardElement = cardTemplate.querySelector("li").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
  
    cardElement.querySelector(".card__title").textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = `На фото ${cardData.name}`;
  
    const deleteCardButton = cardElement.querySelector(".card__delete-button");
    deleteCardButton.addEventListener("click", () => {
      functionDeleteCardCallBack(cardElement);
    });
  
    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.addEventListener('click', () => {
      functionLikeCardCallBack(likeButton);
    })
  
    cardImage.addEventListener("click", () => {
      functionOpenImageCallBack(cardData);
    });
  
    return cardElement;
  }