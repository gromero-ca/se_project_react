const baseUrl = "http://127.0.0.1:3001";

function checkResponse(response) {
  if (!response.ok) {
    return Promise.reject(new Error("Request failed"));
  }

  return response;
}

function getItems() {
  return fetch(`${baseUrl}/items`)
    .then(checkResponse)
    .then((response) => {
      return response.json();
    });
}

function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  })
    .then(checkResponse)
    .then((response) => {
      return response.json();
    });
}

function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then(checkResponse);
}

export { addItem, checkResponse, deleteItem, getItems };
