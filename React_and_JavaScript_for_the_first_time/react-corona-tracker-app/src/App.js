import { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import TopPage from './pages/TopPage';
import WorldPage from "./pages/WorldPage";

import './App.css';

import countriesJson from './countries.json';


function App() {

  const [country, setCountry] = useState("");
  const [countryData, setCountryData] = useState({
    date: "",
    newConfirmed: "",
    totalConfirmed: "",
    newRecoverd: "",
    totalRecoverd: ""
  });

  const getCountryData = () => {
    fetch(`https://monotein-books.vercel.app/api/corona-tracker/country/${country}`)
      .then(res => res.json())
      .then(data => {
        setCountryData({
          date: data[data.length - 1].Date,
          newConfirmed: data[data.length - 1].Confirmed - data[data.length - 2].Confirmed,
          totalConfirmed: data[data.length - 1].Confirmed,
          newRecoverd: data[data.length - 1].Recovered - data[data.length - 2].Recovered,
          totalRecoverd: data[data.length - 1].Recovered
        });
      })
  };


  const [allCountriesData, setAllCountriesData] = useState([])

  useEffect(() => {
    fetch("https://monotein-books.vercel.app/api/corona-tracker/summary")
      .then(res => res.json())
      .then(data => setAllCountriesData(data.Countries))
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <TopPage
            countriesJson={countriesJson}
            setCountry={setCountry}
            getCountryData={getCountryData}
            countryData={countryData}
          />
        } />
        <Route path="world" element={
          <WorldPage
            allCountriesData={allCountriesData}
          />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
