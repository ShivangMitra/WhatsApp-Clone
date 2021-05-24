import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import axios from './axios'

function Login() {

    const signIn = () => {
        const userName = prompt("Please enter your assigned username")
        const userImgUrl = prompt("Please enter image URL of your preferred profile image")

        if (userName) {
            axios.get(`/users/fetch?name=${userName}`)
            .then(response => {
                if(response.data){
                    localStorage.setItem("user", response.data[0].name)
                    localStorage.setItem("userId", response.data[0]._id)
                    window.location.reload()
                }
            })
        }
        if(userImgUrl)
        {
            localStorage.setItem("userImgUrl", userImgUrl)
        }
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src="https://i.pinimg.com/originals/74/49/47/744947e5e2b6b9dd743d284aca6f6e27.png" alt=""/>
                <div className="login__text">
                    <h1>Sign in to Baate</h1>
                </div>
                <Button type="submit" onClick={signIn} >
                    Sign In
                </Button>
            </div>
        </div>
    )
}

export default Login
