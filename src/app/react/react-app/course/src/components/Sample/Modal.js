import React from "react";
import ReactDOM from 'react-dom'
import "./Modal.scss"

const Modal = (props) => {
    const hideModal = () => {
        props.toggleModal();
    }

    return ReactDOM.createPortal(
        <>
            <div className={`alert ${props.showModal ? '' : 'hidden'}`}>
                <h2>This is an Alert!</h2>
                <p>
                    This is a very simple example of how a custom
                    alert window can be created and displayed
                    dynamically using JavaScript.
                </p>
                <button className="modal-btn" onClick={hideModal}>OK</button>
            </div>
            <div className={`overlay ${props.showModal ? '' : 'hidden'}`}></div>
        </>,
        document.getElementById("root-portal")
    )
}

export default Modal;