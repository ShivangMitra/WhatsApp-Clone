import mongoose from 'mongoose'

const whatsappUsersSchema = mongoose.Schema({
    name: String
})

//collection
export default mongoose.model('users', whatsappUsersSchema)