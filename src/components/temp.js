import React, {useState, useEffect} from "react";
import WeatherCard from "./weathercard"
import "./style.css";

const Temp = () => {

    const [searchValue, setSearchValue] = useState("Chennai")
    const [tempInfo, setTempInfo] = useState({})

    const getWeatherInfo = async () => {
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}
            &units=metric&appid=15443127e61e145626825ec8e8bd99d7`
            
            let res = await fetch(url)
            let data = await res.json()
            
            const {temp,humidity,pressure} = data.main;
            const {main:weathermood} = data.weather[0]
            const {name} = data
            const {speed} = data.wind
            const {country, sunset} = data.sys
            
            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                speed,
                country,
                name,
                sunset,
            }
            setTempInfo(myNewWeatherInfo)

        }catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getWeatherInfo()
    },[])

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button className="searchButton" 
          type="button" 
          onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>
      <WeatherCard tempInfo={tempInfo}/>
    </>
  );
};

export default Temp;
