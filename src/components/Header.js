import React from 'react'
import "./Header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    return (
        <div data-toggle="tooltip" title="Developed by Vashanth" data-placement="top">
            <h1 class="block">
                <FontAwesomeIcon icon={faGamepad} color="black"/> H a n g m a n <FontAwesomeIcon icon={faGamepad} color="maroon"/>
            </h1>
        </div>
    )
}

export default Header
