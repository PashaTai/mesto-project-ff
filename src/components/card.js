import { likeCard as likeCardApi, unlikeCard } from "./api.js";

export const likeCard = (likeButton, cardId, likeCountElement) => {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  const apiCall = isLiked ? unlikeCard(cardId) : likeCardApi(cardId);

  apiCall
    .then((cardData) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCountElement.textContent = cardData.likes.length;
    })
    .catch((err) => {});
};

export function createCard(
  cardData,
  cardTemplate,
  functionDeleteCardCallBack,
  functionLikeCardCallBack,
  functionOpenImageCallBack,
  userId
) {
  const cardElement = cardTemplate.querySelector("li").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteCardButton = cardElement.querySelector(".card__delete-button");

  const likeCountElement = document.createElement("span");
  likeCountElement.classList.add("card__like-count");
  likeCountElement.textContent = cardData.likes.length;
  likeButton.appendChild(likeCountElement);

  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = `На фото ${cardData.name}`;

  if (cardData.owner._id === userId) {
    deleteCardButton.addEventListener("click", () => {
      functionDeleteCardCallBack(cardElement, cardData._id);
    });
  } else {
    deleteCardButton.style.display = "none";
  }

  const isLiked = cardData.likes.some((like) => like._id === userId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => {
    functionLikeCardCallBack(likeButton, cardData._id, likeCountElement);
  });

  cardImage.addEventListener("click", () => {
    functionOpenImageCallBack(cardData);
  });

  return cardElement;
}
