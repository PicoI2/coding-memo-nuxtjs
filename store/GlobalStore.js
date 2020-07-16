import Vue from 'vue';
import ApiService from '@/services/ApiService.js';
// Warning ! Here if an anonymous function is used, on the server side it will be unique, and shared between all requests
export const state = () => ({
    languages: [],
    selectedLanguages: [],
    codeExamples: [],
});
export const mutations = {
    SET_LANGUAGES(state, languages) {
        state.languages = languages;
    },
    SET_SELECTED_LANGUAGE(state, {columnIndex, languageId}) {
        Vue.set(state.selectedLanguages, columnIndex, languageId);    // Vue.set must be used to replace element in array
    },
    SET_CODE_EXAMPLES(state, {languageId, codeExamples}) {
        Vue.set(state.codeExamples, languageId, codeExamples);    // Vue.set must be used to replace element in array
    },
}
export const actions = {
    fetchLanguages({ commit }) {
        return ApiService.getLanguages().then(response => {
            commit('SET_LANGUAGES', response.data);
        });
    },
    fetchCodeExamples({ commit }, languageId) {
        return ApiService.getCodeExamples(languageId).then(response => {
            commit('SET_CODE_EXAMPLES', {languageId, codeExamples: response.data});
        });
    },
}
