export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "content-type": 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((response) => {
    return response.json();
  })
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "content-type": 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((response) => {
    return response.json();
  })
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "content-type": 'application/json',
      "authorization": `Bearer ${token}`
    }
  })
  .then((response) => {
    return response.json();
  })
};