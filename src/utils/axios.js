import axios from "axios"


const customFetch = axios.create({
    baseURL : 'https://course-api.com'
})

export default customFetch