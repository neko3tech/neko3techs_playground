import { useState } from "react";
import axios from 'axios';

const Form = () => {
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
        <form>
            <input type="text" name="city" placeholder="都市名" onChange={e => setCity(e.target.value)} />
            <button type="submit" onClick={getWeather}>Get Weather</button>
        </form>
    );
};

export default Form;