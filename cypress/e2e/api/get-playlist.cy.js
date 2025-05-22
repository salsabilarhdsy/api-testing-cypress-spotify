describe('Spotify API - Get Playlist', () => {
  let token;

  before(() => {
    cy.loginSpotify().then((accessToken) => {
      token = accessToken;
    });
  });

  it('Verify that the playlist response includes all required metadata fields', () => {
    const playlistId = '1YPdHoHM7HuBlwXDQYxZzj';
    cy.request({
      method: 'GET',
      url: `/playlists/${playlistId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      const body = response.body;

      // Assertions
      expect(body).to.have.property('collaborative').that.is.a('boolean');
      expect(body).to.have.property('description').that.is.a('string');
      expect(body).to.have.property('external_urls').that.is.an('object');
      expect(body).to.have.property('href').that.is.a('string');
      expect(body).to.have.property('id').that.is.a('string');
      expect(body).to.have.property('images').that.is.an('array');
      expect(body).to.have.property('name').that.is.a('string');
      expect(body).to.have.property('owner').that.is.an('object');
      expect(body).to.have.property('public').that.is.a('boolean');
      expect(body).to.have.property('snapshot_id').that.is.a('string');
      expect(body).to.have.property('tracks').that.is.an('object');
      expect(body).to.have.property('uri').that.is.a('string');
      //assertions for external_urls
      expect(body.external_urls).to.have.property('spotify').that.is.a('string');
      expect(body.owner.external_urls).to.have.property('spotify').that.is.a('string');
      //assertions for images
      expect(body.images[0]).to.have.property('url').that.is.a('string'); 
      expect(body.images[0]).to.have.property('height');
      expect(body.images[0].width === null || typeof body.images[0].width === 'number').to.be.true;
      expect(body.images[0]).to.have.property('width');
      expect(body.images[0].height === null || typeof body.images[0].height === 'number').to.be.true;
      //assertions for ownner
      expect(body.owner).to.have.property('display_name').that.is.a('string');
      expect(body.owner).to.have.property('external_urls').that.is.an('object');
      expect(body.owner).to.have.property('href').that.is.a('string');
      expect(body.owner).to.have.property('id').that.is.a('string');
      expect(body.owner).to.have.property('type').that.is.a('string');
      expect(body.owner).to.have.property('uri').that.is.a('string');

      //assertions for tracks
      if (body.tracks.items.length > 0) {
        expect(body.tracks).to.have.property('href').that.is.a('string');
        expect(body.tracks).to.have.property('limit').that.is.a('number');
        expect(body.tracks).to.have.property('next');
        expect(body.tracks.next === null || typeof body.tracks.next === 'string').to.be.true;
        expect(body.tracks).to.have.property('offset').that.is.a('number');
        expect(body.tracks).to.have.property('total').that.is.a('number');
        expect(body.tracks).to.have.property('previous');
        expect(body.tracks.previous === null || typeof body.tracks.previous === 'string').to.be.true;
        expect(body.tracks).to.have.property('total').that.is.a('number');
        expect(body.tracks).to.have.property('items').that.is.an('array');

      }
    });
  });
  it('Verify that the Spotify API returns 400 for an invalid playlist ID', () => {  
    const invalidPlaylistId = '1YPdHoHM7HuBlwXDQYxZz111';
    cy.request({
      method: 'GET',
      url: `/playlists/${invalidPlaylistId}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.have.property('message').that.is.a('string');
    });
  });
  it('Verify that the Spotify API returns 404 when accessing non-owner private playlist', () => {
    const privatePlaylistId = '0j0upJUq5QNhvXG7zMaifc';
    cy.request({
      method: 'GET',
      url: `/playlists/${privatePlaylistId}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.error).to.have.property('message').that.is.a('string');
    });
  });
  it('Verify that the Spotify API returns 401 for missing or invalid access token', () => {
    const playlistId = '1YPdHoHM7HuBlwXDQYxZzj';
    const invalidToken = 'thsInvldTknforTst1ng'
    cy.request({
      method: 'GET',
      url: `/playlists/${playlistId}`,
      headers: {
        Authorization: `Bearer ${invalidToken}`
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.error).to.have.property('message').that.is.a('string');
    });
  });
  it('Verify response when using an expired access token', () => {
    const expiredToken = 'k2OlnDZ-UtqIo5bW1CFVoV2XdDEJXimUekCd7ZiPBrr8h4wiB4';
    const playlistId = '1YPdHoHM7HuBlwXDQYxZzj';
    cy.request({
      method: 'GET',
      url: `/playlists/${playlistId}`,
      headers: {
        Authorization: `Bearer ${expiredToken}`
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.error).to.have.property('message').that.is.a('string');
    });
  });
  it('Verify non-owner can access a public playlist', () => {
    const playlistId = '1zqspVuNSHtCHXcnNMIJKV';
    cy.request({
      method: 'GET',
      url: `/playlists/${playlistId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {   
      expect(response.status).to.eq(200);
      const body = response.body;

      // verify the playlist name matches the expected name
      expect(body.name).to.eq('Testing #ProjectPlaylist');
    });
  });
  it('Verify user-owned private playlist with valid token', () => {
    const playlistId = '0YFsP4Y95sumj2WvRlHSv6';
    cy.request({
      method: 'GET',
      url: `/playlists/${playlistId}`,
      headers: {
        Authorization: `Bearer ${token}`
      } 
    }).then((response) => {
      expect(response.status).to.eq(200);
      const body = response.body;

      // verify the playlist name matches the expected name
      expect(body.name).to.eq('My Private Playlist #2');
    });
  });
  it('Verify behavior when requesting a playlist with 0 tracks', () => {
    const playlistId = '1L8HpwiSNriPpq97Slyund';
    cy.request({
      method: 'GET',
      url: `/playlists/${playlistId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      const body = response.body;
      // verify the playlist does not have items property
      expect(body).to.not.have.property('items');
    });
  });
  it('Verify that the fields parameter filters the response correctly', () => {
    const playlistId = '1YPdHoHM7HuBlwXDQYxZzj';
    cy.request({
      method: 'GET',
      url: `/playlists/${playlistId}?fields=name, description`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      const body = response.body;

      // Assertions
      expect(body).to.have.property('name').that.is.a('string');
      expect(body).to.have.property('description').that.is.a('string');
      // verify the playlist name matches the expected name
      expect(body.name).to.eq('My Playlist #1'); 
      // verify the playlist description matches the expected description
      expect(body.description).to.eq('my first playlist');
      // verify there is no other property in the response
      expect(body).not.to.have.property('collaborative');
      expect(body).not.to.have.property('id');  
      expect(body).not.to.have.property('items');
    });
  });
});
