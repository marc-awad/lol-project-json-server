# TP - json-server - Lol

## Consignes

### Objectif

L'objectif de ce projet est de réaliser une application web permettant de gérer une liste de champions de **League of Legends**. Cette application se compose de deux parties principales :

1. **Backend** : Utilisation de `json-server` pour créer une API CRUD (Create, Read, Update, Delete) permettant de manipuler les données des champions.
2. **Frontend** : Une interface web permettant d’ajouter, d’afficher, de modifier et de supprimer des champions.

### Fonctionnalités attendues

1. **Backend (json-server)** :

   - Un fichier `db.json` contenant les données des champions.
   - Routes CRUD pour manipuler les champions :
     - `GET/POST http://localhost:3000/champions`
     - `GET/PUT/PATCH/DELETE http://localhost:3000/champions/:id`

2. **Frontend (HTML/CSS/JS)** :

   - Une page `index.html` avec un formulaire permettant d'ajouter un champion (nom, lane, type, image).
   - Un affichage des champions sous forme de cartes contenant :
     - Le nom, la lane et le type du champion.
     - Un bouton "Supprimer" pour supprimer le champion.
     - Un bouton "Modifier" (bonus) pour modifier les informations du champion.
     - Une image du champion (bonus).

3. **Fonctionnement attendu** :
   - **Chargement des champions** : Lors du chargement de la page, une requête `GET` est effectuée sur l'endpoint `/champions` pour récupérer et afficher la liste des champions.
   - **Ajout de champion** : Un formulaire permet d'ajouter un champion via une requête `POST`, puis la liste est mise à jour.
   - **Suppression de champion** : Un bouton "Supprimer" supprime un champion via une requête `DELETE`, puis la liste est mise à jour.
   - **Modification de champion** : (Bonus) Un bouton "Modifier" permet de modifier un champion via une requête `PUT/PATCH`, puis la liste est mise à jour.

---

## Instructions de lancement du projet

### Prérequis

- **Node.js**, **npm** et **json-server version 0.17.0** doivent être installés sur votre machine.

### Étapes d'installation

1. Clonez ce projet sur votre machine :

   ```bash
   git clone https://github.com/marc-awad/lol-project-json-server
   ```

2. Installez les dépendances nécessaires pour le backend (json-server 0.17.0 présent dans le fichier **package.json**) :

   ```bash
   npm install
   ```

3. Démarrez le backend avec `json-server` :

   ```bash
   json-server --watch db.json
   ```

### Explication du code

- **Backend** : Le fichier `db.json` contient les données des champions. Le serveur `json-server` génère automatiquement des routes API pour interagir avec ce fichier.
- **Frontend** : Le fichier `index.html` contient un formulaire pour ajouter des champions et une liste qui s'actualise dynamiquement. Les interactions avec l'API se font via des requêtes AJAX dans le fichier `script.js`.
