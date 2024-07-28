import './Weather.css'
import axios from 'axios';
import { useState } from 'react';
import locationIcon from '../Images/map.svg'
import humidityIcon from '../Images/hum.svg'
import windIcon from '../Images/wind.svg'
import line from '../Images/line.svg'
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
      const getCurrentDate = () => {
        const date = new Date();
        const options = {month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
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
      {weatherData ? (
        <div className='Details-box-inner'>
          {/* <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Condition: {weatherData.weather[0].description}</p> */}
          <p style={{fontSize:'18px',color:'#fff',textAlign:'center'}}>Today, {getCurrentDate()}</p>   
          <p style={{fontSize:'100px',color:'#fff',textAlign:'center',marginTop:'10px'}}>{Math.round(weatherData.main.temp)}°</p>
          <p style={{fontSize:'24px',fontWeight:'700',color:'#fff',textAlign:'center',marginTop:'10px'}}>{weatherData.weather[0].description}</p>
<div className='hum-and-wind-box1'>
<div className='box1'>
    <img src={windIcon} alt="wind icon is here" />
    <p style={{marginLeft:'22px'}}>Wind</p>
    <img style={{height:'21px',marginLeft:'22px'}} src={line} alt="vartical line" />
    <p style={{marginLeft:'22px'}}>{weatherData.wind.speed} m/s</p>
</div>
<div className='box2'>

</div>
</div>
        </div>
      ) : <p style={{fontSize:'24px',fontWeight:'700',color:'#fff',display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center'}}>Please Enter The Location Above</p>}
      </div>

      <button className='fetchWeather-button' onClick={fetchWeather}>Get Weather</button>
      {error && <p>{error}</p>} {/* Display error message if there is any */}
            </div>
        </div>
        </>
    )
}

export default Weather