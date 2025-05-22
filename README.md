
# 🎧 Spotify Web API Testing with Cypress

This project demonstrates how to automate **API testing** for the [Spotify Web API](https://developer.spotify.com/documentation/web-api/) using [Cypress](https://www.cypress.io/). It covers both positive and negative scenarios.

---

## Project Structure

```
api-testing-cypress-spotify/
├── cypress/
│   ├── e2e/
│   │   └── get-playlist.cy.js  # Main test specs
│   └── support/
│       └── commands.js         # Custom Cypress commands
├── cypress.config.js           # Cypress configuration
├── package.json                # Node dependencies and scripts
└── README.md                   # Project documentation
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v14+
- [npm](https://www.npmjs.com/)
- [Spotify Developer Account](https://developer.spotify.com/) with API credentials

### Installation

```bash
git clone https://github.com/salsabilarhdsy/api-testing-cypress-spotify.git
cd api-testing-cypress-spotify
npm install
```

### Environment Setup

Create a `.env` file in the project root:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token
```

##### Playlist ID in get-playlist.cy.js might need to be updated based on your application and the registered user.

## 🧪 Running Tests

### Headless Mode (CLI)

```bash
npx cypress run
```

### Interactive Mode (GUI)

```bash
npx cypress open
```

Select the `get-playlist.cy.js` test spec to run tests in the browser UI.

---

## ✅ Test Scenarios Covered

Test case [document here](https://docs.google.com/spreadsheets/d/1reCAvIL_NpesE2AJct4CRTuuEs4gnWqx9JiPCU2Tix0/edit?usp=sharing).
The test automation includes:

- ✅ Verifying the meta data in the response
- ✅ Verifying private and public playlist
- ✅ Verifying filter in fields for playlist information
- ✅ Verifying nested fields in `tracks.items` for track information

---

## Configuration

Cypress configuration is defined in `cypress.config.js`:

```js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://api.spotify.com/v1',
  },
});
```

Ensure your Spotify access token logic is set up in custom commands.

---

## 📄 License

This project is open-sourced under the [MIT License](LICENSE).