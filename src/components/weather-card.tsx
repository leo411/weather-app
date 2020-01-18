import React from 'react'
import './weather-card.css'
import { WeatherPoint } from '../App'
import clearskyday from '../images/01d.png'
import clearskynight from '../images/01n.png'
import fewcloudsday from '../images/02d.png'
import fewcloudsnight from '../images/02n.png'
import scatteredcloudsday from '../images/03d.png'
import scatteredcloudsnight from '../images/03n.png'
import brokencloudsday from '../images/04d.png'
import brokencloudsnight from '../images/04n.png'
import showerrainday from '../images/09d.png'
import showerrainnight from '../images/09n.png'
import rainday from '../images/10d.png'
import rainnight from '../images/10n.png'
import thunderstormday from '../images/11d.png'
import thunderstormnight from '../images/11n.png'
import snowday from '../images/13d.png'
import snownight from '../images/13n.png'
import mistday from '../images/50d.png'
import mistnight from '../images/50n.png'

let iconCodeToImage: { [key: string]: any } = {
    '01d': clearskyday,
    '01n': clearskynight,
    '02d': fewcloudsday,
    '02n': fewcloudsnight,
    '03d': scatteredcloudsday,
    '03n': scatteredcloudsnight,
    '04d': brokencloudsday,
    '04n': brokencloudsnight,
    '09d': showerrainday,
    '09n': showerrainnight,
    '10d': rainday,
    '10n': rainnight,
    '11d': thunderstormday,
    '11n': thunderstormnight,
    '13d': snowday,
    '13n': snownight,
    '50d': mistday,
    '50n': mistnight
}

export const WeatherCard = (props: { cardData: WeatherPoint }) => {
    let cardData = props.cardData
    return (
        <div className="card">
            <div className="card-body ">
                <h6 className="card-title">
                    {cardData.dt_js?.toLocaleDateString('fr-FR', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                    })}
                </h6>
                <img
                    src={iconCodeToImage[cardData.weather[0].icon]}
                    alt="icon meteo"
                ></img>
                <p className="card-text">
                    <small className="text-muted">
                        {Math.round(cardData.main.temp_min)}°
                    </small>
                </p>
                <p className="card-text">
                    {Math.round(cardData.main.temp_max)}°
                </p>
            </div>
        </div>
    )
}
export default WeatherCard
