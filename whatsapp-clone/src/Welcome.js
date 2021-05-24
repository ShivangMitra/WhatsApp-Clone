import React from 'react'
import './Welcome.css'

function Welcome() {

    return (
        <div className="welcome">
            
            <div className="welcome__body">
            <div className="welcome__container">
                <img src="https://i.pinimg.com/originals/74/49/47/744947e5e2b6b9dd743d284aca6f6e27.png" alt=""/>
                <div className="welcome__text">
                    <h1>Welcome to Baate</h1>
                    <p>Select a room or create a new room and start chatting</p>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Welcome
