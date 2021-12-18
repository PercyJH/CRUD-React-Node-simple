import React, { useState, useEffect } from "react";
import Axios from 'axios';
import "./App.css";

function App() {
  const [title, setTitle] = useState('');
  const [score, setScore] = useState(0);
  
  // PARA ACTUALLIZAR EL SCORE Y LA EMISIÓN
  const [newScore, setNewScore] = useState(0);

  //Para imprimir el API
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setAnimeList(response.data);
  });
}, []);

  const addToList = () => {
    Axios.post("http://localhost:3001/insertar", {
      title: title,
      score: score
    });
  };

  const updateScore = (id) => {
    Axios.put("http://localhost:3001/actualizar", {
      id: id,
      newScore: newScore,
    });
  }
  
  const deleteAnime = (id) => {
    Axios.delete(`http://localhost:3001/eliminar/${id}`, {
    });
  }

  return (
    <div className="App">
      <h1>CRUD SIMPLE CON REACT</h1>

      <label>Título del Anime:</label>
      <input type="text"
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />

      <label>Puntuación:</label>
      <input type="number"
        onChange={(event) => {
          setScore(event.target.value);
        }}
      />

      <button onClick={addToList} type="submit">Guardar</button>

      <hr/>

      <h1>LISTA DE ANIMES</h1>

      {animeList.map((val, key) => {
        return (
          <form key={key} className="cells">
            <h1>Anime: {val.title}</h1>
            <h2>Puntuación: {val.score}</h2>
            <input 
              type="text"
              placeholder="Nueva puntuación..?"
              onChange={(event) => {
                setNewScore(event.target.value);
              }}
            />
            <button onClick={()=> updateScore(val._id)} type="submit"> Actualizar </button> 
            <button onClick={()=> deleteAnime(val._id)} type="submit"> Eliminar </button> 
            {" "}
          </form>
        );
      })}
    </div>
  );
}

export default App;