# TP - json-server - Lol

## Instructions

### Objective

The objective of this project is to create a web application for managing a list of **League of Legends** champions. This application consists of two main parts:

1. **Backend**: Using `json-server` to create a CRUD (Create, Read, Update, Delete) API for managing champion data.
2. **Frontend**: A web interface for adding, displaying, editing, and deleting champions.

### Expected Features

1. **Backend (json-server)**:

   - A `db.json` file containing the champions' data.
   - CRUD routes to manage the champions:
     - `GET/POST http://localhost:3000/champions`
     - `GET/PUT/PATCH/DELETE http://localhost:3000/champions/:id`

2. **Frontend (HTML/CSS/JS)**:

   - An `index.html` page with a form for adding a champion (name, lane, type, image).
   - A display of champions as cards including:
     - The champion's name, lane, and type.
     - A "Delete" button to remove the champion.
     - A "Edit" button (bonus) to update the champion's details.
     - A champion image (bonus).

3. **Expected Functionality**:
   - **Loading Champions**: On page load, a `GET` request is made to the `/champions` endpoint to fetch and display the list of champions.
   - **Adding a Champion**: A form allows adding a champion via a `POST` request, and the list updates afterward.
   - **Deleting a Champion**: A "Delete" button removes a champion via a `DELETE` request, and the list updates afterward.
   - **Editing a Champion**: (Bonus) A "Edit" button allows updating a champion via a `PUT/PATCH` request, and the list updates afterward.

---

## Project Launch Instructions

### Prerequisites

- **Node.js**, **npm**, and **json-server version 0.17.0** must be installed on your machine.

### Installation Steps

1. Clone this project onto your machine:

   ```bash
   git clone https://github.com/marc-awad/lol-project-json-server
   ```

2. Install the required dependencies for the backend (json-server 0.17.0 specified in the **package.json** file):

   ```bash
   npm install
   ```

3. Start the backend with `json-server`:

   ```bash
   json-server --watch db.json
   ```

### Code Explanation

- **Backend**: The `db.json` file contains the champions' data. The `json-server` automatically generates API routes to interact with this file.
- **Frontend**: The `index.html` file contains a form for adding champions and a dynamically updated list. Interactions with the API are made via AJAX requests in the `script.js` file.

- **Code Distribution**:
  - Lines 1-16: _Variable Declarations_
  - Lines 17-67: _Utility Functions (regex validation, popup handling, fetch request simplifications, and button creation)_
  - Lines 69-161: _CRUD Functions_
  - Lines 163-232: _Event Listeners on Buttons_