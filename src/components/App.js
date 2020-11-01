import React, {useState} from 'react';
import WeatherCard from './WeatherCard'
import axios from 'axios'
require('dotenv').config()

function App() {

  const [list, setList] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [radioOption, setRadioOption] = useState("");

  function addCard(newCard){
    setList((prevCards) =>{
      return [...prevCards, newCard];
    })
  }

  function handleChange(event){
    setUserInput(event.target.value);
    console.log(event.target.value);
  }

  function handleRadioChange(event){
    setRadioOption(event.target.value);
  }

  function handleSubmit(event){
    event.preventDefault();

    let units;
    let text;

    switch(radioOption){
      case "Fahrenheit":
        units = "imperial";
        text = "°F";
        break;
      case "Celsius":
        units = "metric";
        text = "°C";
        break;
      case "Kelvin":
        units = "standard";
        text = "K";
        break;
      default:
        units = "imperial";
        text = "°F";
        break;
    }

    const appid = process.env.REACT_APP_OPENWEATHER_API_KEY;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + appid + "&units=" + units;
    axios.get(url)
      .then(res => {
        const today = new Date();
        const weatherData = res.data;
        addCard({
          location: userInput.toUpperCase(),
          date: today.toDateString(),
          img: "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png",
          temp: weatherData.main.temp,
          description: weatherData.weather[0].description,
          units: text
        })
      })
      .catch(error => console.log("There was an error!", error))
  }

  return (
    <div>
      <h1>Today's Forecast</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Input Location :
          <input type="text" value={userInput} name="state" onChange={handleChange} />
          <button type="submit">Search</button>
        </label>
        <br />
        <input type="radio" id="Fahrenheit" name="units" value="Fahrenheit" checked={radioOption === "Fahrenheit"} onChange={handleRadioChange} />
        <label for="male">Fahreheit</label>
        <input type="radio" id="Celsius" name="units" value="Celsius" checked={radioOption === "Celsius"} onChange={handleRadioChange} />
        <label for="male">Celsius</label>
        <input type="radio" id="Kelvin" name="units" value="Kelvin" checked={radioOption === "Kelvin"} onChange={handleRadioChange} />
        <label for="male">Kelvin</label>
      </form>
      <div className="row">
        {list.map((card) => (
          <WeatherCard location={card.location} date={card.date} img={card.img} temp={card.temp} description={card.description} units={card.units}/>
        ))}
      </div>
    </div>
  );
}

export default App;
