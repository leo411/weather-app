import React, { useState, useEffect } from 'react'
import './App.css'
import WeatherCard from './components/weather-card'
import Header from './components/header'
import SearchBar from './components/search-bar'

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
export interface WeatherPoint {
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
    list: WeatherPoint[]
    city: City
}

function filterOnlyMidday(arrayToFilter: WeatherPoint[] = []) {
    return arrayToFilter.filter(
        (singlePoint: WeatherPoint) => singlePoint.dt_js?.getHours() === 12
    )
}

function filterByDate(arrayToFilter: WeatherPoint[] = [], datetime: Date) {
    return arrayToFilter.filter(
        (singlePoint: WeatherPoint) =>
            singlePoint.dt_js?.getDate() === datetime.getDate()
    )
}

const App: React.FC = () => {
    let [weatherData, setWeatherData] = useState<WeatherPoint[]>()
    let [selectedDate, setSelectedDate] = useState<Date | null>()
    let [selectedAddress, setselectedAddress] = useState<string>('Arcachon')

    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${selectedAddress}&units=metric&appid=10a1b8209d01a059e09e70c7468cd694`
        )
            .then(response => {
                return response.json()
            })
            .then((data: DataFromAPI) => {
                let dataWithDates: WeatherPoint[] = data.list.map(
                    (day: WeatherPoint) => ({
                        ...day,
                        dt_js: new Date(day.dt_txt)
                    })
                )
                setWeatherData(dataWithDates)
            })
    }, [selectedAddress])

    return (
        <div className="app">
            <div className="full-background"></div>
            <SearchBar addressSetter={setselectedAddress} />
            {selectedAddress}
            <Header showDayDetail={selectedDate ? true : false} />
            {!selectedDate ? (
                <div className="d-flex justify-content-around mt-3 flex-wrap">
                    {filterOnlyMidday(weatherData).map(
                        (weatherDayData: WeatherPoint, i) => (
                            <div
                                className="cursor-pointer m-3"
                                onClick={() =>
                                    setSelectedDate(weatherDayData.dt_js)
                                }
                            >
                                <WeatherCard
                                    key={i}
                                    showTime={false}
                                    cardData={weatherDayData}
                                />
                            </div>
                        )
                    )}
                </div>
            ) : (
                <div>
                    <button
                        type="button"
                        className="button-text header-button transform"
                        onClick={() => setSelectedDate(null)}
                    >
                        Retour
                    </button>
                    <div className="d-flex mt-3 justify-content-around flex-wrap">
                        {filterByDate(weatherData, selectedDate).map(
                            (weatherDayData: WeatherPoint, i) => (
                                <WeatherCard
                                    key={i}
                                    showTime={true}
                                    cardData={weatherDayData}
                                />
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
