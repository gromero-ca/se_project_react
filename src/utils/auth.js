import { baseUrl, checkResponse } from "./api.js";

function signup(data) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(checkResponse)
    .then((response) => response.json());
}

function signin(data) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(checkResponse)
    .then((response) => response.json());
}

function getCurrentUser(token) {
  return fetch(`${baseUrl}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(checkResponse)
    .then((response) => response.json());
}

export { signup, signin, getCurrentUser };
