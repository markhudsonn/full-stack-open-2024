import { useEffect, useState } from "react";
import axios from 'axios';

const CountryWeather = ({ countryCapital }) => {
    const [weather, setWeather] = useState(null)
    const api_key = import.meta.env.VITE_SOME_KEY

    useEffect(() => {
        if (countryCapital) {
            axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${countryCapital[0]}&appid=${api_key}&units=metric`)
                .then(response => {
                    setWeather(response.data)
                })
                .catch(error => console.error('Error fetching weather data:', error));
        }
    }, [])

   if (!weather) {
       return <p>Unable to fetch weather data</p>
    }

    return (
        <div>
            <h3>Weather in {countryCapital}</h3>
            <p>Temperature: {weather.main.temp} °C</p>
            <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt={`Weather icon for ${weather.weather[0].description}`} />
            <p>Wind: {weather.wind.speed} m/s</p>
            <p>Cloudiness: {weather.weather[0].description}</p>
        </div>
    )
}

export default CountryWeather
