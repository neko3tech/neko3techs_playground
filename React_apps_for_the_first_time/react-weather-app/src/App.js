import { useState } from "react";
import axios from 'axios';

import Title from "./components/Title"
import Form from "./components/Form"
import Results from "./components/Results";

import './App.css';

function App() {

  const api_key = process.env.REACT_APP_WEATHERAPI_KEY;
  const [city, setCity] = useState("");
  const getWeather = (e) => {
    e.preventDefault();
    axios.get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=London&aqi=no`)
      .then(
        res => console.log(res)
      );
  };

  return (
    <div className="hello">
      <Title />
      <Form setCity={setCity} getWeather={getWeather} />
      <Results />
    </div>
  );
}

export default App;
