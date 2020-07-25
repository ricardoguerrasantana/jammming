import React from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

const searchResult1 = {
  name: 'Agua' ,
  artist: 'J. Balvin & Tiny' ,
  album: 'Bob Sponge movie' ,
  id: '0'
};

const searchResult2 = {
  name: 'Tak Tiki Tak' ,
  artist: 'Harry Nach' ,
  album: 'Single' ,
  id: '1'
};

const searchResults = [
  searchResult1 ,
  searchResult2
];

const playlist = {
  playlistName: 'My Top 50' ,
  playlistTracks: [
    searchResult1 ,
    searchResult2
  ]
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      searchResults: searchResults ,
      playlist: {
        playlistName: '' , 
        playlistTracks: []
      }
    };

    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    if (this.state.playlist.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    const newPlaylistTracks = this.state.playlist.playlistTracks;
    newPlaylistTracks.push(track);
    this.setState({
      playlistTracks: newPlaylistTracks
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* <!-- Add a SearchBar component --> */}
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack}></SearchResults>
            <Playlist playlist={this.state.playlist}></Playlist>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
