import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js'
import { useEffect, useState } from 'react'
import axios from './axios'
import { BrowserRouter as Router } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import Login from './Login';
import Welcome from './Welcome'


function App() {

  const [messages, setMessages] = useState([])

  useEffect(() => {
    axios.get('/messages/sync')
      .then(response => {
        setMessages(response.data)
      })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('8c8b63c2d152b1360568', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }

  }, [messages])

  console.log(messages)

  return (
    <div className="app">

      {
        !(localStorage.getItem("user")) ? (
          <Login></Login>
        ) : (
            <div className="app__body">
              <Router>
                <Sidebar messages={messages}></Sidebar>
                <Switch>

                  <Route path="/rooms/:roomId">
                    <Chat messages={messages}></Chat>
                  </Route>

                  <Route path="/">
                    <Welcome></Welcome>
                  </Route>

                </Switch>
              </Router>
            </div>
          )
      }

    </div>
  );
}

export default App;
