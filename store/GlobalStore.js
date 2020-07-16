import ApiService from '@/services/ApiService.js'
// Warning ! Here if an anonymous function is used, on the server side it will be unique, and shared between all requests
export const state = () => ({
    languages: []
});
export const mutations = {
    SET_LANGUAGES(state, languages) {
        state.languages = languages
    },
}
export const actions = {
    fetchLanguages({ commit }) {
        return ApiService.getLanguages().then(response => {
            commit('SET_LANGUAGES', response.data);
        });
    },
}
