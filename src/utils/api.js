const baseUrl = "http://localhost:3001";

function checkResponse(response) {
  if (!response.ok) {
    return Promise.reject(new Error("Request failed"));
  }
  return response;
}

function getItems() {
  return fetch(`${baseUrl}/items`)
    .then(checkResponse)
    .then((response) => response.json());
}

function addItem({ name, imageUrl, weather }, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  })
    .then(checkResponse)
    .then((response) => response.json());
}

function deleteItem(id, token) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then(checkResponse);
}

function addCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(checkResponse)
    .then((response) => response.json());
}

function removeCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(checkResponse)
    .then((response) => response.json());
}

function updateProfile(data, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then(checkResponse)
    .then((response) => response.json());
}

export {
  addCardLike,
  addItem,
  baseUrl,
  checkResponse,
  deleteItem,
  getItems,
  removeCardLike,
  updateProfile,
};
