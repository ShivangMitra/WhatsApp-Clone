//importing
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Rooms from './dbRooms.js'
import Users from './dbUsers.js'
import Pusher from 'pusher'
import cors from 'cors'

//app config
const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1144311",
    key: "8c8b63c2d152b1360568",
    secret: "7f94621ff6385f793135",
    cluster: "ap2",
    useTLS: true
});

//middleware
app.use(express.json())
app.use(cors())

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     next()
// })

//DB config
const connection_url = 'mongodb+srv://admin:WP9WjfBnF6vfbeZT@cluster0.yjzoh.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// on change pusher for messages
const db = mongoose.connection
db.once('open', ()=>{
    console.log('DB connected')

    const msgCollection = db.collection('messagecontents')
    const changeStream = msgCollection.watch()

    changeStream.on('change', (change)=>{

        console.log("A change occured in messages", change)

        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                userId: messageDetails.userId,
                roomId: messageDetails.roomId,
                received: messageDetails.received
            })
        }
        else{
            console.log("Error triggering pusher")
        }
    })

})

// on change pusher for rooms
db.once('open', ()=>{
    console.log('DB connected')

    const roomCollection = db.collection('rooms')
    const changeStream = roomCollection.watch()

    changeStream.on('change', (change)=>{

        console.log("A change occured in rooms", change)

        if(change.operationType === 'insert'){
            const roomDetails = change.fullDocument;
            pusher.trigger('rooms', 'inserted', {
                name: roomDetails.name,
                roomImgUrl: roomDetails.roomImgUrl
            })
        }
        else{
            console.log("Error triggering pusher")
        }
    })

})

//api routes
app.get("/", (req, res) => res.status(200).send("im ON"))

app.post("/messages/new", (req, res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(`new messages created: \n ${data}`)
        }
    })
})

app.get("/messages/sync", (req, res) => {
    Messages.find((err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

app.post("/rooms/new", (req, res) => {
    const dbRoom = req.body

    Rooms.create(dbRoom, (err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(`new room created: \n ${data}`)
        }
    })
})

app.get("/rooms/sync", (req, res) => {
    Rooms.find((err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

app.get("/rooms/name", (req, res) => {
    Rooms.find({_id: req.query.id}, (err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

app.post("/users/new", (req, res) => {
    const dbRoom = req.body

    Users.create(dbRoom, (err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(`new user created: \n ${data}`)
        }
    })
})

app.get("/users/fetch", (req, res) => {
    Users.find({name: req.query.name}, (err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

//listen
app.listen(port, () => console.log(`listening on localhost ${port}`))