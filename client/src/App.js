import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";
// import { response } from "express";

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      console.log(response);
    });
  }, []);

  const addToList = () => {
    Axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      days: days,
    });
  };

  return (
    <div className="App">
      <h1>CRUD App with MERN</h1>
      <label>Food Name:</label>
      <input
        type="text"
        onChange={(event) => {
          setFoodName(event.target.value);
        }}
      />
      <label>Days Since You Ate It:</label>
      <input
        type="number"
        onChange={(event) => {
          setDays(event.target.value);
        }}
      />
      <button onClick={addToList}>Add To List</button>
    </div>
  );
}

export default App;
