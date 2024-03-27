import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import YTSearch from "youtube-api-search";

function Home(props) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const youtubeAPI = "AIzaSyBc1gOs6jl0DqPeovrcIJXdAHQuJRKsxp4";

  const handleSearch = (e) => {
    e.preventDefault();
    props.search(search);
    try {
      YTSearch({ key: youtubeAPI, term: search }, (videos) => {
        props.results(videos);
        navigate("/video");
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="home">
      <h1 className="top">YourElder</h1>

      <form onSubmit={handleSearch}>
        <div className="buscador top">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            maxLength={60}
            placeholder="Escriba su canción"
            autoFocus
          ></input>
        </div>
      </form>
    </div>
  );
}

export default Home;
