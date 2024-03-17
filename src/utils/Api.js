import axios from "axios"

export const APIClient = () => axios.create({
    baseURL: 'URL',
    headers: {
        'Content-Type': 'application/json',
    }
})