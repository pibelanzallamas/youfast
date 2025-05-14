import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function Home() {
  const youtubeAPI = import.meta.env.VITE_API_KEY; //youtube api key
  const inputRef = useRef(null);
  const nextRef = useRef(null);
  const backRef = useRef(null);
  const [search, setSearch] = useState(""); //prompt
  const [videos, setVideos] = useState([]); //videos encontrados
  const [result, setResult] = useState(null); //video seleccionado
  const [contador, setContador] = useState(0); //numero de video
  const [ready, setReady] = useState(false);
  const [access, setAccess] = useState(false); //llave de entrada
  const [code, setCode] = useState("");

  // SELECCIONADOR DE VIDEO
  useEffect(() => {
    if (videos.length > 0) {
      setResult(videos[contador]);
    }
  }, [contador, videos]);

  // ESTADO DE CARGA
  useEffect(() => {
    if (result && result.snippet) {
      setReady(true);
    } else {
      setReady(false);
    }
  }, [result]);

  // SHORTCUTS
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "/") {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.ctrlKey && event.key === "ArrowRight") {
        event.preventDefault();
        nextRef.current?.click();
      }
      if (event.ctrlKey && event.key === "ArrowLeft") {
        event.preventDefault();
        backRef.current?.click();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // BUSCADOS DE 20 RESULTADOS
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const feedback = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${search}&key=${youtubeAPI}`
      );
      const items = feedback.data.items || [];
      setVideos(items);
      setContador(0);
      if (items.length > 0) {
        setResult(items[0]);
      } else {
        setResult(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // LOGIN
  function handleCode(e) {
    e.preventDefault();
    if (code == import.meta.env.VITE_LOGIN_KEY) {
      setAccess(true);
    } else {
      alert("contraseña incorrecta!");
    }
  }

  return (
    <div className="home">
      <h1
        className="top"
        onClick={() => {
          setSearch("");
          setReady(false);
          setResult(null);
          setVideos([]);
        }}
        style={{ cursor: "pointer" }}
      >
        YouFast
      </h1>

      {access ? (
        <>
          <form onSubmit={handleSearch}>
            <div className="buscador search-song top">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                maxLength={60}
                placeholder="Escribir canción"
                autoFocus
                ref={inputRef}
              ></input>
            </div>
          </form>
          <div className="instrucciones top">
            <p className="title">
              <u>Instrucciones</u>
            </p>
            <p>1. Escribí la canción más el artista en la barra de búsqueda.</p>
            <p>2. Apretá ENTER.</p>
            <p>3. Si no es la que buscas, dale a Siguiente ⏭.</p>
          </div>

          {ready && result && (
            <div className="video top">
              <h3 style={{ fontSize: "1.4rem" }}>▶️ {result.snippet.title}</h3>
              <iframe
                className="iframe top"
                width="600"
                height="315"
                src={`https://www.youtube.com/embed/${result.id.videoId}?rel=0?autoplay=1`}
                title={result.snippet.title}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="botones top">
                {contador != 0 && (
                  <button
                    ref={backRef}
                    onClick={() => setContador(contador - 1)}
                  >
                    {/* ⏮ Previous */}⏮ Anterior
                  </button>
                )}
                {contador < 19 && (
                  <button
                    ref={nextRef}
                    onClick={() => setContador(contador + 1)}
                  >
                    {/* Next ⏭ */}
                    Siguiente ⏭
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {/* <div className="instrucciones top"> */}
          <p className="title-clave">Ingrese código: </p>
          {/* </div> */}
          <form onSubmit={handleCode}>
            <div className="buscador top">
              <input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={30}
                placeholder="********"
                autoFocus
                ref={inputRef}
              ></input>
            </div>
          </form>
        </>
      )}
      <div style={{ flex: "1" }}></div>

      <footer className="top" style={{ fontSize: "1.1rem" }}>
        <p>Hecho por Brandon Castillo 🔥</p>
      </footer>
    </div>
  );
}

export default Home;
