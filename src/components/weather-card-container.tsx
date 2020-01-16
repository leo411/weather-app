import React from 'react'
import './weather-card-container.css'
import { WeatherDay } from '../App'

export const WeatherCard = (props: { cardData: WeatherDay }) => {
    let cardData = props.cardData
    return (
        <div className="card-deck">
            <div className="card">
                <div className="card-body">
                    <h6 className="card-title">{cardData.dt_txt}</h6>
                    <h5 className="card-title">{cardData.weather[0].main}</h5>
                    <p className="card-text">
                        Température minimum :
                        {Math.round(cardData.main.temp_min)}°
                    </p>
                    <p className="card-text">
                        <small className="text-muted">
                            Température maximum :{' '}
                            {Math.round(cardData.main.temp_max)}°
                        </small>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default WeatherCard
