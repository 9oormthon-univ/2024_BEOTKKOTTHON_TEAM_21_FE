import axios from "axios"

export const APIClient = () => axios.create({
    baseURL: 'http://3.35.236.118:8080/',
    headers: {
        'Content-Type': 'application/json',
    }
})