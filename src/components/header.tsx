import React from 'react'
import './header.css'
import soleil from '../images/soleil_logo.png'

export const Header = (props: {
    showDayDetail: boolean
    selectedAddress: string
}) => {
    let showDayDetail = props.showDayDetail
    let selectedAddress = props.selectedAddress
    return (
        <div>
            <img src={soleil} className="header-logo img-fluid" alt="logo" />
            <p className="header-text">{selectedAddress}</p>
            {showDayDetail ? (
                <p className="header-link header-subtext">
                    Temps à {selectedAddress} de la journée
                </p>
            ) : (
                <p className="header-link header-subtext">
                    Temps à {selectedAddress} des 5 prochains jours
                </p>
            )}
        </div>
    )
}

export default Header
