import React from 'react'
import './header.css'
import soleil from '../images/soleil_logo.png'

export const Header = (props: { showDayDetail: boolean }) => {
    let showDayDetail = props.showDayDetail
    return (
        <div>
            <img src={soleil} className="header-logo img-fluid" alt="logo" />
            <p className="header-text">Arcachon</p>
            {showDayDetail ? (
                <p className="header-link header-subtext">
                    Temps à Arcachon de la journée
                </p>
            ) : (
                <p className="header-link header-subtext">
                    Temps à Arcachon des 5 prochains jours
                </p>
            )}
        </div>
    )
}

export default Header
