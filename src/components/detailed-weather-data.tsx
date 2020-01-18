import React from 'react'
import { WeatherPoint } from '../App'

export const DetailedWeatherData = (props: { data: WeatherPoint[] }) => {
    console.log(props)
    return <span>{props.data.toString()}</span>
}

export default DetailedWeatherData
