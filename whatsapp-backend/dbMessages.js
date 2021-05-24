import mongoose from 'mongoose'

const whatsappSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    userId: String,
    roomId:String,
    received: Boolean,
})

//collection
export default mongoose.model('messagecontents', whatsappSchema)