import { Avatar } from '@material-ui/core'
import React from 'react'
// import { useEffect, useState } from 'react'
import './SidebarChat.css'
import axios from './axios'
import { Link } from 'react-router-dom'

function SidebarChat({ addNewChat, name, id, roomImgUrl, messages }) {

    const createChat = () => {
        const roomName = prompt("Please enter name for chat")
        const roomImgUrl = prompt("Please enter image URL of your preferred room image")

        if (roomName) {
            axios.post('/rooms/new', {
                name: roomName,
                roomImgUrl: roomImgUrl
            })
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={roomImgUrl}></Avatar>
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    {/* <p>This is last message</p> */}
                    <p>
                        {
                            (messages[messages.map(ele=>ele.roomId).lastIndexOf(id)]===undefined)?(
                                <p>No chats yet</p>):(
                                <p>{messages[messages.map(ele=>ele.roomId).lastIndexOf(id)].message}</p>)
                        }
                    </p>
                </div>
            </div>
        </Link>
    ) : (
            <div onClick={createChat} className="sidebarChat" >
                <h2>Add new chat</h2>
            </div>
        )
}

export default SidebarChat
