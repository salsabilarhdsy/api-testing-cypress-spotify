describe('Spotify API - Get Playlist', () => {
  let token;

  before(() => {
    cy.loginSpotify().then((accessToken) => {
      token = accessToken;
    });
  });

  it('Verify that the playlist response includes all required metadata fields', () => {
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
    const invalidPlaylistId = '1zqspVuNSHtCHXcnNMIJ111K';
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
  })
});
