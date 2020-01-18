import React from 'react'
import './header.css'
import soleil from '../images/soleil_logo.png'

export const Header = () => {
    return (
        <div>
            <div className="full-background"></div>
            <img src={soleil} className="header-logo" alt="logo" />
            <p className="header-text">Arcachon</p>
            <p className="header-link header-subtext">Temps à Arcachon</p>
        </div>
    )
}

export default Header
