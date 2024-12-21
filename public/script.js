////////////////////////////////////////////////////////////////////////////////////
// Variable initialization
////////////////////////////////////////////////////////////////////////////////////

const divChamp = document.getElementById("divChamp")
const champions = document.getElementById("allChamp")
const addButton = document.getElementById("addButton")
const overlay = document.getElementById("overlay")
const popup = document.getElementById("popup")
const displayInputButton = document.getElementById("displayInput")
const nameDiv = document.getElementById("modifyName")
const laneDiv = document.getElementById("modifyLane")
const typeDiv = document.getElementById("modifyType")
const imageurlDiv = document.getElementById("modifyImage")
const API_URL = "http://localhost:3000/champions"
let modifyBlockID

////////////////////////////////////////////////////////////////////////////////////
// Utility functions
////////////////////////////////////////////////////////////////////////////////////

// Function with regex to validate the URL
function isValidURL(URL) {
  const regex =
    /https?:\/\/(?:www\.)?[^\/\s]+\/[^\s?#]+\.(?:jpg|jpeg|png|gif|bmp|webp|svg)(?:\?[^\s#]*)?(?:#[^\s]*)?/i
  return regex.test(URL)
}

// Function with regex to validate the name
function isValidLeagueOfLegendsName(name) {
  const regex = /^[a-zA-Z'\-]{2,}$/
  return regex.test(name)
}

// Function to simplify fetch calls with error handling
function fetchJSON(url, options = {}) {
  return fetch(url, options).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`)
    }
    return response.json()
  })
}

// Function to create a button
function createButton(text, onClick) {
  const button = document.createElement("button")
  button.innerHTML = text
  button.addEventListener("click", onClick)
  return button
}

// Function to display the modify popup
function displayModifyPopup(champId) {
  modifyBlockID = champId
  overlay.style.display = "block"
  popup.style.display = "block"
}

// Function to close the modify popups
function closeAllPopup() {
  overlay.style.display = "none"
  popup.style.display = "none"
  document
    .querySelectorAll(".popup")
    .forEach((popupDiv) => (popupDiv.style.display = "none"))
}

////////////////////////////////////////////////////////////////////////////////////
// CRUD Functions
////////////////////////////////////////////////////////////////////////////////////

// Create a html card for a champion
function createChampionCard(champ) {
  const champDiv = document.createElement("div")
  champDiv.innerHTML = `
    <h2>${champ.name}</h2>
    <img src="${champ.imageurl}" alt="${champ.name}">
    <p>Lane : ${champ.lane}</p>
    <p>Type : ${champ.type}</p>
  `

  const delButton = createButton("Supprimer", () => deleteChampion(champ.id))
  const modifyButton = createButton("Modifier", () =>
    displayModifyPopup(champ.id)
  )
  delButton.classList.add("deletingButton")

  champions.appendChild(champDiv)
  champDiv.appendChild(delButton)
  champDiv.appendChild(modifyButton)
}

// Function to load the champions GET request
function loadChampion() {
  // Empty the div before reloading
  champions.innerHTML = ""
  fetchJSON(API_URL)
    .then((champs) => {
      divChamp.style.display = champs.length ? "block" : "none"
      champs.forEach((champ) => createChampionCard(champ))
    })
    .catch((error) => {
      divChamp.style.display = "none"
      console.error("Error loading champions: ", error)
    })
}

// Add a champion POST request
function addChampionToJson(name, lane, type, imageurl) {
  // Check if the URL is valid
  if (!isValidURL(imageurl)) {
    alert("Invalid URL")
    return
  }
  // Check if the name is valid
  if (!isValidLeagueOfLegendsName(name)) {
    alert("Invalid name")
    return
  }

  // Add the champion with fetch
  const newChamp = { name, lane, type, imageurl }
  fetchJSON(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newChamp),
  }).then(() => loadChampion())
}

// Delete a champion DELETE request
function deleteChampion(champId) {
  fetchJSON(`${API_URL}/${champId}`, { method: "DELETE" })
    .then(() => loadChampion())
    .catch((error) => console.error("Error deleting champion: ", error))
}

// Delete all champions DELETE request
function deleteAllChampion() {
  // Retrieve all champions
  fetchJSON(API_URL)
    .then((champs) => {
      champs.forEach((champ) => {
        // Delete each champion with fetch using their ID
        fetchJSON(`${API_URL}/${champ.id}`, { method: "DELETE" })
      })
    })
    .catch((error) => console.error("Error deleting champions: ", error))
  loadChampion()
}

// Function to modify a champion by its ID PATCH request
function modifyChampion(field, champId, newValue) {
  fetchJSON(`${API_URL}/${champId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ [field]: newValue }),
  })
    .then(() => loadChampion())
    .catch((error) => console.error("Error modifying champion: ", error))
  closeAllPopup()
}

////////////////////////////////////////////////////////////////////////////////////
//Event Listeners
////////////////////////////////////////////////////////////////////////////////////

// Button events that call the addChampionToJson method after retrieving the values
addButton.addEventListener("click", (e) => {
  e.preventDefault()
  const name = document.getElementById("name").value
  const lane = document.getElementById("lane").value
  const type = document.getElementById("type").value
  const imageurl = document.getElementById("imageurl").value
  addChampionToJson(name, lane, type, imageurl)
})

// Button events
displayInputButton.addEventListener("click", () => {
  popup.style.display = "none"
  const modifyChoice = document.getElementById("modifyChoice").value
  const modifyDivs = {
    name: nameDiv,
    lane: laneDiv,
    type: typeDiv,
    imageurl: imageurlDiv,
  }
  if (modifyDivs[modifyChoice]) {
    modifyDivs[modifyChoice].style.display = "block"
  }
})

// Retrieve all popup buttons and add an event listener
document.querySelectorAll(".popup button").forEach((button) => {
  button.addEventListener("click", () => {
    const champId = modifyBlockID
    switch (button.id) {
      case "validateName":
        const newName = document.getElementById("modifyNameInput").value
        if (!isValidLeagueOfLegendsName(newName)) {
          alert("Invalid name")
          return
        }
        modifyChampion("name", champId, newName)
        break
      case "validateLane":
        modifyChampion(
          "lane",
          champId,
          document.getElementById("modifyLaneSelect").value
        )
        break
      case "validateType":
        modifyChampion(
          "type",
          champId,
          document.getElementById("modifyTypeSelect").value
        )
        break
      case "validateImage":
        const newImage = document.getElementById("modifyImageInput").value
        if (!isValidURL(newImage)) {
          alert("Invalid URL")
          return
        }
        modifyChampion("imageurl", champId, newImage)
        break
    }
  })
})

// Close the modify popups when clicking on the overlay
overlay.addEventListener("click", closeAllPopup)

// Initialize champions on load
loadChampion()
