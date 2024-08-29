import styles from "./App.module.css";
import React, {useState} from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import { Spotify } from "../../util/Spotify";

function App() {
   
  const [searchResults, setSearchResult] = useState([
    {
      name: "track 1",
      artist: "artist 1",
      album: "album 1",
      id: 1
    },
    {
      name: "track 2",
      artist: "artist 2",
      album: "album 2",
      id: 2
    }
  ]); 

  const [playlistName, setPlaylistName] = useState("playList 1");

  const [playlistTracks, setPlaylistTracks] = useState([
    {
      name: "playlist track 1",
      artist: "playlist artist 1",
      album: "playlist album 1",
      id: 3
    },
    {
      name: "playlist track 2",
      artist: "playlist artist 2",
      album: "playlist  album 2",
      id: 4
    }
  ]); 

  function addTrack(track) {
    const oldlist = playlistTracks.find((t) => t.id === track.id);
    const newlist = ([...playlistTracks, track]);

    if (oldlist) {
      console.log("Track existed");
    } else {
      setPlaylistTracks(newlist);
    }
  }

  function removeTrack(track) {
    const newlist = playlistTracks.filter(t => t.id !== track.id);
    setPlaylistTracks(newlist);
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  function savePlaylist() {
    const trackURIs = playlistTracks.map(t => t.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([])
    })
  }

  function search(term) {
    Spotify.search(term).then(result => setSearchResult(result))
    console.log(term);
  }

  return (
    <div>
      <h1>
        Ja<span className={styles.highlight}>mmm</span>ing
      </h1>
      <div className={styles.App}>
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar onSearch={search} />
        <div className={styles["App-playlist"]}>
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults usersearchResults={searchResults} onAdd={addTrack} />
          {/* <!-- Add a Playlist component --> */}
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
