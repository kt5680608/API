import './App.css';
import React, { useState }from 'react'

/*
  -------------------------------API--------------------------------------
  appid: 고유 API키
  units: 측정 단위 (섭씨, 화씨 등)
  weather?q: 도시이름
   -----------------------------------------------------------------------
*/

/* fetch에 필요한 key와 base*/
const api = {
  key: "55927e857b3445770ca63e9c86c6133d",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {

  const [city, setCity] = useState([]);
  const [data, setData] = useState('');

  const search = (event) => {
    if (event.key === "Enter") {
      /*
      fetch: API를 사용하여 백엔드 서버와 비동기 요청을 하는 방식 중 하나임
      fetch('url')
      fetch (res => res.json())
      */

      /*
      화씨 $units=imperial
      섭씨 $units=metric
      */
      fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setData(result);
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    let days = [ "Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat" ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return ` ${day} ${date} ${month} ${year}`
  }
  return (
    <div className="App">
      <div className="container">

        <div className="search__box">
          <input
            type="text" 
            className = "search__bar"
            placeholder = "Search..."
            onChange = {e => setCity(e.target.value)}
            value = {city}
            onKeyPress = {search}
          />
        </div>
        <div className="result__box">
        {(typeof data.main != "undefined") ? (
          <div className="location__box">
            <div className="location">{data.name}, {data.sys.country}</div>
            <div className="date">{ dateBuilder (new Date())}</div>
            <div className="weather__box">
              <div className="temp">
                {/*Math.round함수는 입력값을 반올림한 수와 가까운 정수값 반환*/}
                {Math.round(data.main.temp)}°c
              </div>
              <div className="weather">{data.weather[0].main}</div>
            </div>
          </div>
        ):('')}
        </div>
      </div>
    </div>
  );
}

export default App;
