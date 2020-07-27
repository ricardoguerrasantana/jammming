let accessToken;
let expiresIn;
const clientID = c16126cc70dc4e28b127ce22b56f1a8a;
const redirectURI = 'http://localhost:3000/';

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        } else if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
            accessToken = window.location.href.match(/access_token=([^&]*)/);
            expiresIn = window.location.href.match(/expires_in=([^&]*)/);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    }
};

module.exports = Spotify;