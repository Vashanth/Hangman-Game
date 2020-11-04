import React, {useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import "./Hangman.css"

const  openModal = () => {
    document.getElementById("butt").click()
}

const reload = () => {
    window.location.reload()
}

const Modal = ({desc}) => {
    useEffect(() => {
        openModal()
    })

    return (
        <div>
            <button type="button" style={{display:"none"}} class="btn btn-primary" data-toggle="modal" id="butt" data-target="#myModal"></button>
            <div class="modal fade" id="myModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        
                        <div class="modal-header">
                            <h4 class="modal-title">{desc}</h4>
                        </div>

                        <div class="modal-footer">
                            <button style={{width:"auto"}} type="button" class="btn btn-danger" onClick={reload} data-dismiss="modal">
                                <FontAwesomeIcon icon={faRedo} color="black"/> Try Again
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
