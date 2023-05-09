import { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import TopPage from './pages/TopPage';
import WorldPage from "./pages/WorldPage";
import './App.css';

import countriesJson from './countries.json';


function App() {

  const [country, setCountry] = useState("japan");
  const [countryData, setCountryData] = useState({
    date: "",
    newConfirmed: "",
    totalConfirmed: "",
    newRecoverd: "",
    totalRecoverd: ""
  });
  const [loading, setLoading] = useState(false);
  const [allCountriesData, setAllCountriesData] = useState([]);


  useEffect(() => {
    const getCountryData = () => {
      setLoading(true);
      fetch(`${process.env.REACT_APP_PROXY_SERVER_BASE_URL_COUNTRY_DATA}?${country}`)
        .then(res => res.json())
        .then(data => {
          setCountryData({
            date: data[data.length - 1].Date,
            newConfirmed: data[data.length - 1].Confirmed - data[data.length - 2].Confirmed,
            totalConfirmed: data[data.length - 1].Confirmed,
            newRecoverd: data[data.length - 1].Recovered - data[data.length - 2].Recovered,
            totalRecoverd: data[data.length - 1].Recovered
          });
          setLoading(false);
        })
        .catch(err => {
          alert("エラーが発生しました。\nページをリロードして、もう一度トライしてください。");
        });
    };
    getCountryData();
  }, [country]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PROXY_SERVER_BASE_URL_WORLD_DATA}`)
      .then(res => res.json())
      .then(data => setAllCountriesData(data.Countries))
      .catch(err => {
        alert("エラーが発生しました。\nページをリロードして、もう一度トライしてください。");
      });
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <TopPage
            countriesJson={countriesJson}
            setCountry={setCountry}
            countryData={countryData}
            loading={loading}
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
