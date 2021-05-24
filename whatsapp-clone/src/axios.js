import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://zeph-whatsapp-backend.herokuapp.com/'
})

export default instance