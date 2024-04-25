import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import YTSearch from "youtube-api-search";

function Home(props) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const youtubeAPI = import.meta.env.VITE_API_KEY;

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
      <h1 className="top">Abuelitos</h1>
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
      <p className="epigrafe">
        Buscador de canciones destinado para que nuestros abuelos y abuelas
        puedan buscar sus canciones favoritas. <section>Suerte Abue!</section>
      </p>
      <div className="space-fill"></div>
      <footer>
        <p>Creado por Brandon Castillo ⚔️🏰</p>
      </footer>
    </div>
  );
}

export default Home;
