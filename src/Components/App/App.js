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

    this.state = { searchResults: searchResults };
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* <!-- Add a SearchBar component --> */}
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}></SearchResults>
            <Playlist playlist={playlist}></Playlist>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
