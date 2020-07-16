import axios from 'axios'
    
const apiClient = axios.create({
    baseURL: `http://localhost:9000/api`,
    withCredentials: false, 
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getLanguages() {
        return apiClient.get('/languages');
    },
}
