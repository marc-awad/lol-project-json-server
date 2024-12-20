const divChamp = document.getElementById("divChamp")
const champions = document.getElementById("allChamp")
const addButton = document.getElementById("addButton")
const deleteButton = document.getElementById("deleteButton")

function isValidURL(URL) {
  const regex =
    /https?:\/\/(?:www\.)?[^\/\s]+\/[^\s?#]+\.(?:jpg|jpeg|png|gif|bmp|webp|svg)(?:\?[^\s#]*)?(?:#[^\s]*)?/i
  return regex.test(URL)
}

function isValidLeagueOfLegendsName(name) {
  const regex = /^[a-zA-Z']{2,}$/
  return regex.test(name)
}

function loadChampion() {
  fetch("http://localhost:3000/champions")
    .then((response) => response.json())
    .then((champs) => {
      if (champs.length === 0) {
        divChamp.style.display = "none"
      } else {
        divChamp.style.display = "block"
      }
      champs.forEach((champ) => {
        champDiv = document.createElement("div")
        delButton = document.createElement("button")
        modifyButton = document.createElement("button")

        delButton.innerHTML = "Supprimer"
        delButton.classList.add("deletingButton")
        delButton.addEventListener("click", async () => {
          await deleteChampion(champ.id)
        })

        modifyButton.innerHTML = "Modifier"
        modifyButton.addEventListener("click", async () => {
          await modifyChampion(champ.id)
        })

        champDiv.innerHTML = `
      <h2>${champ.name}</h2>
      <img src="${champ.imageurl}" alt="${champ.name}">
      <p>Lane : ${champ.lane}</p>
      <p>Type : ${champ.type}</p>
      `
        champions.appendChild(champDiv)
        champDiv.appendChild(delButton)
        champDiv.appendChild(modifyButton)
      })
    })
    .catch((error) => {
      console.error("Erreur lors de la suppresion des champions : ", error)
    })
}

function addChampion(name, lane, type, imageurl) {
  if (!isValidURL(imageurl)) {
    alert("URL invalide")
    return
  }
  if (!isValidLeagueOfLegendsName(name)) {
    alert("Nom invalide")
    return
  }
  let newChamp = {
    name: name,
    lane: lane,
    type: type,
    imageurl: imageurl,
  }
  fetch("http://localhost:3000/champions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newChamp),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Champion ajouté : ", data)
    })
    .catch((error) => {
      console.error("Erreur lors de l'ajout du champion : ", error)
    })
  loadChampion()
}

function deleteAllChampion() {
  fetch("http://localhost:3000/champions")
    .then((response) => response.json())
    .then((champs) => {
      champs.forEach((champ) => {
        fetch(`http://localhost:3000/champions/${champ.id}`, {
          method: "DELETE",
        })
      })
    })
    .catch((error) => {
      console.error("Erreur lors de la suppresion des champions : ", error)
    })
  loadChampion()
}

addButton.addEventListener("click", (e) => {
  e.preventDefault()
  let name = document.getElementById("name").value
  let lane = document.getElementById("lane").value
  let type = document.getElementById("type").value
  let imageurl = document.getElementById("imageurl").value

  addChampion(name, lane, type, imageurl)
})

function deleteChampion(champId) {
  fetch(`http://localhost:3000/champions/${champId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Champion supprimé : ", data)
    })
    .catch((error) => {
      console.error("Erreur lors de la suppresion du champion : ", error)
    })
  loadChampion()
}

function modifyChampion(champID) {
  prompt("Nom du champion")
  // fetch(`http://localhost:3000/champions/${champID}`, {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(newChamp),
  // })
}

loadChampion()
