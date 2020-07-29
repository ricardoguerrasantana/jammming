let accessToken;
const clientID = process.env.REACT_APP_JAMMMING_CLIENT_ID;
const redirectURI = 'http://localhost:3000/';
// console.log(process.env.REACT_APP_JAMMMING_CLIENT_ID);

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            // console.log(accessTokenMatch[1]);
            accessToken = accessTokenMatch[1];
            // console.log(expiresInMatch[1]);
            const expiresIn = Number(expiresInMatch[1]);
            
            window.setTimeout(() => accessToken = '' , expiresIn * 1000);
            window.history.pushState('Access Token' , null , '/');

            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessUrl;
        }
    }
    ,
    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(
            `https://api.spotify.com/v1/search?type=track&q=${term}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then(response => {
                // console.log(response.json());
                return response.json();
            }).then((jsonResponse) => {
                // console.log(jsonResponse);
                if (!jsonResponse.tracks) {
                    return [];
                } else {
                    return jsonResponse.tracks.items.map(track => {
                        // console.log(track);
                        return {
                            id: track.id ,
                            name: track.name , 
                            artist: track.artists[0].name , 
                            album: track.album.name ,
                            uri: track.uri 
                        };
                    });
                }
            });
    } 
    ,
    savePlaylist(plalistName , tracksURIs) {
        if (plalistName && tracksURIs) {
            const accessToken = Spotify.getAccessToken();
            const headers = { Authorization: `Bearer ${accessToken}` };
            let usersID;

            return fetch(
                'https://api.spotify.com/v1/me' , 
                { headers: headers }
            ).then(response => {
                return response.json();
            }).then((jsonResponse) => {
                usersID = jsonResponse.id;
                return fetch(
                    `https://api.spotify.com/v1/users/${usersID}/playlists` ,
                    {
                        headers: headers , 
                        method: 'POST' , 
                        body: JSON.stringify({ name: plalistName })
                    }
                ).then(response => {
                   return response.json();
                }).then((jsonResponse) => {
                   const playlistID = jsonResponse.id;
                   return fetch(`https://api.spotify.com/v1/users/${usersID}/playlists/${playlistID}/tracks` , {
                       headers: headers ,
                       method: 'POST' ,
                       body: JSON.stringify({ uris: tracksURIs })
                   });
                });
            });

        } else {
            return;
        }
    }
};

export default Spotify;