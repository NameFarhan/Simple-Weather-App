import './Weather.css'
import axios from 'axios';
import { useState } from 'react';
import locationIcon from '../Images/map.svg'

const Weather = () =>{
    const [location, setLocation] = useState(''); 
    const [weatherData, setWeatherData] = useState(null); // State to store fetched weather data
    const [error, setError] = useState(null); // State to store any error messages

    const fetchWeather = async () => {
        const apiKey = 'a3a73bf2fb0d46f02463f798f1a0f04a'; // Replace with your OpenWeatherMap API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    
        try {
          const response = await axios.get(url); // Send request to the API using axios
          console.log('Response:', response); // Log the response object
          setWeatherData(response.data); // Store the weather data in state
          setError(null); // Clear any previous error messages
        } catch (err) {
          console.error('Error:', err); // Log the error object
          setError(err.response ? err.response.data.message : err.message); // Store error message in state
          setWeatherData(null); // Clear previous weather data
        }
      };

    return (
        <>
        <div className="Wrapper">
            <div className="real-app">
                <div className='input-field-and-icon'>
                    <img src={locationIcon} alt="Location icon" />
            <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
      />
      </div>

      <div className='weather-Details-Box'>

      </div>

      <button className='fetchWeather' onClick={fetchWeather}>Get Weather</button>
            </div>
        </div>
        </>
    )
}

export default Weather