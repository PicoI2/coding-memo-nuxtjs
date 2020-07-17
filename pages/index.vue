<template>
    <v-container fluid>
        <v-row justify="space-around">
            <v-col justify="space-around" cols="6">
                <LanguageExamples :columnIndex="1"/>
                <span v-if="selectedLanguages[1]">
                    {{selectedLanguages[1]}} has been chosen
                </span>
            </v-col>
            <v-col justify="space-around" cols="6">
                <LanguageExamples :columnIndex="2"/>
                <span v-if="selectedLanguages[2]">
                    {{selectedLanguages[2]}} has been chosen
                </span>
            </v-col>
            {{selectedLanguages}}
        </v-row>
    </v-container>
</template>

<script>

import { mapState } from 'vuex';

import LanguageExamples from '@/components/LanguageExamples.vue'

export default {
    components: {
        LanguageExamples
    },
    // created: async () => {
    //     await context.store.dispatch('languages/fetchLanguages');
    // },
    async fetch (context) {
        try {
            await context.store.dispatch('GlobalStore/fetchLanguages')
        }
        catch(e) {
            context.error({statusCode: 503, message: 'Unable to fetch languages at this time.'});
        };
    },
    computed: mapState({
        languages: state => state.GlobalStore.languages,
        selectedLanguages: state => state.GlobalStore.selectedLanguages,
    })
}
</script>
