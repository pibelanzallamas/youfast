import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Video(props) {
  const navigate = useNavigate();
  const [contador, setContador] = useState(0);
  const [result, setResult] = useState(props.results[contador] || {});

  useEffect(() => {
    setResult(props.results[contador] || {});
  }, [contador]);

  return (
    <div className="home">
      {/* BOTON ATRAS-------------------- */}
      <div className="boton-atras botones">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Buscar otra canción
        </button>
      </div>
      {/* TITULO------------------------- */}
      <div className="top">
        {result.id ? (
          <div className="titulo">
            <h4>Resultados con: "{props.search}"</h4>
          </div>
        ) : (
          <h3> No hay video</h3>
        )}
      </div>
      {/* VIDEO------------------------- */}
      <div className="video top">
        {result.id ? (
          <iframe
            width="600"
            height="315"
            src={`https://www.youtube.com/embed/${result.id.videoId}?autoplay=1`}
            title={result.snippet.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <></>
        )}
      </div>
      {/* BOTONES----------------------- */}
      {result.id ? (
        <div className="botones top">
          {contador == 0 ? (
            <></>
          ) : (
            <button onClick={() => setContador(contador - 1)}>Anterior</button>
          )}
          {contador > 3 ? (
            <></>
          ) : (
            <button onClick={() => setContador(contador + 1)}>Siguiente</button>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Video;
