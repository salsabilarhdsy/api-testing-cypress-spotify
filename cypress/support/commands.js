// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginSpotify', () => {
  const clientId = Cypress.env('SPOTIFY_CLIENT_ID');
  const clientSecret = Cypress.env('SPOTIFY_CLIENT_SECRET');
  const refreshToken = Cypress.env('SPOTIFY_REFRESH_TOKEN');
  const basicAuth = btoa(`${clientId}:${clientSecret}`);

  return cy.request({
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    form: true,
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }
  }).then((res) => {
    const accessToken = res.body.access_token;
    // Simpan token di alias Cypress
    Cypress.env('spotifyAccessToken', accessToken);
    return accessToken;
  });
});