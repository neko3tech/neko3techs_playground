import { useState } from "react";
import TopPage from './pages/TopPage';

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

  return (
    <div>
      <TopPage countriesJson={countriesJson} setCountry={setCountry} getCountryData={getCountryData} />
    </div>
  );
}

export default App;
