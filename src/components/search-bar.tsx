import React, { useState, useEffect } from 'react'
import './search-bar.css'

export interface Geometry {
    type: string
    coordinates: number[]
}
export interface Properties {
    label: string
    score: number
    housenumber: string
    id: string
    type: string
    x: number
    y: number
    importance: number
    name: string
    postcode: string
    citycode: string
    city: string
    context: string
    street: string
}
export interface Features {
    type: string
    geometry: Geometry
    property: Properties
}
export interface DataFromApi {
    type: string
    version: string
    features: Features[]
    attribution: string
    licence: string
    query: string
    limit: number
}

const SearchBar = (props: { addressSetter: Function }) => {
    let addressSetter = props.addressSetter
    let [cityInput, setCityInput] = useState<string>('')
    let [addressRecommandations, setAddressRecommandations] = useState<any[]>(
        []
    )

    useEffect(() => {
        fetch(`https://api-adresse.data.gouv.fr/search/?q=${cityInput}`)
            .then(response => response.json())
            .then(jsonResponse => {
                setAddressRecommandations(jsonResponse.features)
            })
    }, [cityInput])

    return (
        <div style={{ position: 'relative', minWidth: '500px' }}>
            <form>
                <input
                    type="text"
                    value={cityInput}
                    placeholder="enter a city"
                    onChange={e => setCityInput(e.target.value)}
                    className="searchbar"
                    style={{ width: '100%' }}
                />
            </form>
            <ul className="dropdownlist">
                {addressRecommandations.map(addressRecommandation => (
                    <li
                        className="citysuggestion"
                        onClick={() => {
                            addressSetter(addressRecommandation.properties.city)
                            setAddressRecommandations([])
                        }}
                    >
                        {addressRecommandation.properties.label}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SearchBar
