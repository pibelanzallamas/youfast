import { useState } from "react";
import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Video from "./components/Video";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState("");
  function handleData(value) {
    setSearch(value);
  }
  function handleResults(value) {
    setResults(value);
  }
  return (
    <>
      <Analytics />
      <Routes>
        <Route
          path={"/"}
          element={<Home search={handleData} results={handleResults} />}
        />
        <Route
          path={"/video"}
          element={<Video search={search} results={results} />}
        />
      </Routes>
    </>
  );
}

export default App;
