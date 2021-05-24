import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import DonutLargeIcon from "@material-ui/icons/DonutLarge"
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { Avatar, IconButton } from '@material-ui/core'
import { SearchOutlined } from '@material-ui/icons'
import SidebarChat from './SidebarChat'
import axios from './axios'
import Pusher from 'pusher-js'

function Sidebar({messages}) {

    const [rooms, setRooms] = useState([])

    useEffect(() => {
        axios.get('/rooms/sync')
            .then(response => {
                setRooms(response.data)
            })
    }, [])

    useEffect(() => {
        const pusher = new Pusher('8c8b63c2d152b1360568', {
          cluster: 'ap2'
        });
    
        const channel = pusher.subscribe('rooms');
        channel.bind('inserted', (newRoom) => {
          setRooms([...rooms, newRoom])
        });
    
        return () => {
          channel.unbind_all()
          channel.unsubscribe()
        }
    
      }, [rooms])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={localStorage.getItem("userImgUrl")}></Avatar>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon style={{ color: "#d4d5d7" }}></DonutLargeIcon>
                    </IconButton>
                    <IconButton>
                        <ChatIcon style={{ color: "#d4d5d7" }}></ChatIcon>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon style={{ color: "#d4d5d7" }}></MoreVertIcon>
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined></SearchOutlined>
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat ></SidebarChat>
                {
                    rooms.map((room)=>(
                        <SidebarChat key={room._id} id={room._id} name={room.name} roomImgUrl={room.roomImgUrl} messages={messages} ></SidebarChat>
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar
