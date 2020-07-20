const axios = require('axios');
    
const apiClient = axios.create({
    baseURL: `http://localhost:9012/api`,
    withCredentials: false, 
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

const apiService = {
    getLanguages() {
        return apiClient.get('/languages');
    },
    getCodeExamples(id) {
        return apiClient.get(`/codeexamples/${id}`);
    },
    getExamples() {
        return apiClient.get(`/examples`);
    },
};

module.exports = apiService;
