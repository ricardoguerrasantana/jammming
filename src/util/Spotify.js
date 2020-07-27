let accessToken;
let expiresIn;
const clientID = 'c16126cc70dc4e28b127ce22b56f1a8a';
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
    } ,

    search(term) {
        const urlToFetch = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        return fetch(
            urlToFetch , 
            {
                headers: {
                    authorization: `Bearer${accessToken}`
                }
            }
            ).then((response) => {
                return response.json();
            }).then((jsonResponse) => {
                return jsonResponse.map((track) => {
                    return {
                        id: track.id ,
                        name: track.name , 
                        artist: track.artists[0].name , 
                        album: track.album.name ,
                        uri: track.uri 
                    };
                });
            });
    }
};

export default Spotify;