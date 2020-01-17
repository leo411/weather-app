import React, { useState, useEffect } from 'react'
import './App.css'
import WeatherCard from './components/weather-card-container'
import fakeData from './assets/weather-data.json'
import Header from './components/header'

export interface MainWeather {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level: number
    grnd_level: number
    humidity: number
    temp_kf: number
}

export interface Weather {
    id: number
    main: string
    description: string
    icon: string
}
export interface Clouds {
    all: number
}
export interface Wind {
    speed: number
    deg: number
}
export interface Sys {
    pod: string
}
export interface WeatherDay {
    dt: number
    main: MainWeather
    weather: Weather[]
    clouds: Clouds
    wind: Wind
    sys: Sys
    dt_txt: string
    dt_js?: Date
}

export interface City {
    id: number
    name: string
    coord: { lat: number; lon: number }
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
}

export interface DataFromAPI {
    cod: string
    message: number
    cnt: number
    list: WeatherDay[]
    city: City
}

function filterOnlyMidday(arrayToFilter: WeatherDay[]) {
    return arrayToFilter.filter(
        (singlePoint: WeatherDay) => singlePoint.dt_js?.getHours() === 12
    )
}

const App: React.FC = () => {
    let [weatherWeekData, setWeatherWeekData] = useState<WeatherDay[]>()

    useEffect(() => {
        fetch(
            'http://api.openweathermap.org/data/2.5/forecast?q=arcachon,fr&units=metric&appid=10a1b8209d01a059e09e70c7468cd694'
        )
            .then(response => {
                return response.json()
            })
            .then((data: DataFromAPI) => {
                let typedData: DataFromAPI = fakeData
                let dataWithDates: WeatherDay[] = typedData.list.map(
                    (day: WeatherDay) => ({
                        ...day,
                        dt_js: new Date(day.dt_txt)
                    })
                )
                console.log('DATAWITHDATES', dataWithDates)
                setWeatherWeekData(filterOnlyMidday(dataWithDates))
            })
    }, [])

    return (
        <div className="App">
            <Header />
            <div className="d-flex justify-content-center mt-3 ">
                {weatherWeekData && weatherWeekData.length > 0
                    ? weatherWeekData.map((weatherDayData: WeatherDay, i) => (
                          <WeatherCard key={i} cardData={weatherDayData} />
                      ))
                    : null}
            </div>
        </div>
    )
}

export default App
