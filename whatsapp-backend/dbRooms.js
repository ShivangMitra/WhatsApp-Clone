import mongoose from 'mongoose'

const whatsappRoomSchema = mongoose.Schema({
    name: String,
    roomImgUrl: String
})

//collection
export default mongoose.model('rooms', whatsappRoomSchema)