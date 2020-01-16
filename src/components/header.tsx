import React from 'react'
import './header.css'
import soleil from '../images/soleil_logo.png'

export const Header = () => {
    return (
        <div>
            <div className="full-background"></div>
            <img src={soleil} className="App-logo" alt="logo" />
            <p className="App-text">Arcachon</p>
            <a
                className="App-link App-subtext"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Temps à Arcachon
            </a>
        </div>
    )
}

export default Header
