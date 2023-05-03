import { useState } from "react";
import TopPage from './pages/TopPage';

import './App.css';
import countriesJson from './countries.json';

function App() {

  const [country, setCountry] = useState("");

  const getCountryData = () => {
    fetch(`https://monotein-books.vercel.app/api/corona-tracker/country/${country}`)
      .then(res => res.json())
      .then(data => console.log(data))
  };

  return (
    <div>
      <TopPage countriesJson={countriesJson} setCountry={setCountry} getCountryData={getCountryData} />
    </div>
  );
}

export default App;
