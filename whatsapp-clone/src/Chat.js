import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons'
import React, { useEffect, useState} from 'react'
import './Chat.css'
import axios from './axios'
import { useParams } from 'react-router-dom'

function Chat({ messages }) {

    const [input, setInput] = useState("")
    const { roomId } = useParams()
    const [room, setRoomName] = useState('')

    useEffect(() => {
        if (roomId) {
            axios.get(`/rooms/name?id=${roomId}`)
                .then(response => {
                    setRoomName(response.data[0])
                })
        }
    }, [roomId])

    const sendMessage = async (e) => {
        e.preventDefault()

        await axios.post('/messages/new', {
            message: input,
            name: localStorage.getItem("user"),
            timestamp: new Date().toLocaleString(),
            userId: localStorage.getItem("userId"),
            roomId: roomId,
            received: true
        })

        setInput('')
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={
                    room.roomImgUrl
                }></Avatar>
                <div className="chat__headerInfo">
                    <h3>{room.name}</h3>
                    {
                        (messages[messages.map(ele=>ele.roomId).lastIndexOf(roomId)]===undefined)?(
                        <p>No chats yet</p>):(
                        <p>{`Last seen at ${messages[messages.map(ele=>ele.roomId).lastIndexOf(roomId)].timestamp}`}</p>)
                    }
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined style={{ color: "#d4d5d7" }}></SearchOutlined>
                    </IconButton>
                    <IconButton>
                        <AttachFile style={{ color: "#d4d5d7" }}></AttachFile>
                    </IconButton>
                    <IconButton>
                        <MoreVert style={{ color: "#d4d5d7" }}></MoreVert>
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message => {
                    var flag = false
                    var roomCheck = false
                    if (message.userId === localStorage.getItem("userId")) {
                        flag = true
                    }
                    if (message.roomId === roomId) {
                        roomCheck = true
                    }
                    if(roomCheck){
                        return(<p className={`chat__message ${(flag) && 'chat__reciever'}`}>
                            <span className="chat__name">{message.name}</span>
                            {message.message}
                            <p className="chat__timestamp">
                                {message.timestamp}
                            </p>
                        </p>)
                    }
                    else{
                        return null
                    }
                }
                )}
            </div>
            <div className="chat__footer">
                <InsertEmoticon></InsertEmoticon>
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <Mic></Mic>
            </div>
        </div>
    )
}

export default Chat
