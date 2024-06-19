const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-16',
  headers: {
    authorization: '19d7d909-715c-479f-94b4-5784f68fb5f4',
    'Content-Type': 'application/json'
  }
}

const handleRequest = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
    .then(handleRequest);
}

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
    .then(handleRequest);
}

export const getData = () => {
  return Promise.all([getUser(), getCards()])
};

export const patchAvatar = (newDataAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newDataAvatar,
    })
  }) .then(handleRequest);
}

export const patchProfile = (newDataUser) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newDataUser.name,
      about: newDataUser.about
    })
  }) .then(handleRequest);
}

export const postNewCard = (newCardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: newCardData.name,
      link: newCardData.link
    })
  }) .then(handleRequest);
}

export const deleteCardRequest = (deleteCardId) => {
  return fetch(`${config.baseUrl}/cards/${deleteCardId}`, {
    method: 'DELETE',
    headers: config.headers
  }) .then(handleRequest);
}

export const putLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  }) .then(handleRequest);
}

export const deleteLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }) .then(handleRequest);
}