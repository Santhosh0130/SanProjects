import { useEffect, useState } from 'react'

import wind from './icons/wind.svg'
import cloud from './icons/03d.svg'
import humidity from './icons/humidity.svg'
import rainy from './icons/10d.svg'
import clear from './icons/01d.svg'
import clearNight from './icons/clearNight.svg'
import ice from './icons/13d.svg'
import showerRain from './icons/09d.svg'
import mist from './icons/50d.svg'
import thunder from './icons/11d.svg'
import brokenClouds from './icons/04d.svg'
import './WeatherApp.css'

const Weather = ({cel, icon, city, contry, lat, long, humidityVal, windVal}) => {
  return(
    <>
    <div className="image">
      <img src={icon} alt="Image" />
    </div>
    <div className="det">
      <div className="cel"><span>{cel}</span>°C</div>
      <div className="city">{city}</div>
      <div className="contry">{contry}</div>
    </div>
    <div className="cord">
      <div className="lat">
        <span>Latitude </span>
        <span>{lat}</span>
      </div>
      <div className="long">
        <span>Longitude </span>
        <span>{long}</span>
      </div>
    </div>
    <div className="others">
      <div className="humidity">
        <img src={humidity} alt="Humidity" />
        <span>{humidityVal} %</span>
        <div>Humidity</div>
      </div>
      <div className="wind">
        <img src={wind} alt="Wind" />
        <span>{windVal} km/h</span>
        <div>Wind Speed</div>
      </div>
    </div>
    </>
  )
}


function App() {
  const apiKey = "0ef58f4a45b82b9ce1c080f51b22f277"

  const [cel, setCel] = useState(0)
  const [icons, setIcons] = useState(clear)
  const [city, setCity] = useState()
  const [text, setText] = useState("Chennai")
  const [contry, setContry] = useState()
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)
  const [wind, setWind] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [load, setLoad] = useState(false)
  const [error, setError] = useState(null)
  const [cityNotFound, setCityNotFound] = useState(false)

  const wearherIconMap = {
    "01d" : clear,
    "01n" : clearNight,
    "02d" : brokenClouds,
    "02n" : brokenClouds,
    "03d" : cloud,
    "03n" : cloud,
    "04d" : brokenClouds,
    "04n" : brokenClouds,
    "09d" : showerRain,
    "09n" : showerRain,
    "10d" : rainy,
    "10n" : rainy,
    "11d" : thunder,
    "11n" : thunder,
    "13d" : ice,
    "13n" : ice,
    "50d" : mist,
    "50n" : mist
  }
  useEffect(function () {
    search()
  }, [])

  const search = async () => {
  setLoad(true)

  let api = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`

  try{
    let res = await fetch(api)
    let data = await res.json()

    console.log(data)

    if(data.cod == "404"){
      setCityNotFound(true)
      setLoad(false)
      return;
    }else{
      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setLat(data.coord.lat)
      setLong(data.coord.lon)
      setCel(Math.floor(data.main.temp))
      setContry(data.sys.country)
      setCity(data.name)
      const weatherIcon = data.weather[0].icon
      setIcons(wearherIconMap[weatherIcon] || clear)
      setCityNotFound(false)
    }
  }catch(e){
    console.log(e.message)
    setError("Error Accuring while fetching data...")
  }finally{
    setLoad(false)
  }
  } 

  return (
    <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=search" />
    
      <div className='container'>
        <div className="input-container">
          <input type="text" onKeyDown={(e) => {e.key === "Enter" ? search() : null}} onChange={(e) => {setText(e.target.value)}} value={text} placeholder='Enter the city' />
          <div class="material-symbols-outlined" onClick={search}>search</div>
        </div>
        {!load && !cityNotFound && !error &&
          <Weather cel={cel} icon={icons} city={city} contry={contry} lat={lat} long={long} windVal={wind} humidityVal={humidity}/>
        }
        {load && <div className="not-load-container">Loading...</div>}
        {error && <div className="not-load-container">{error}</div>}
        {cityNotFound && <div className="not-load-container">City Not Found...</div>}
        <p className="copyright">
          Disigned By <span>San</span>
        </p>
      </div>
    </>
  )
}

export default App
