<template>
    <v-container fluid>
        <v-row justify="space-around">
            <v-col justify="space-around" cols="2"/>
            <v-col justify="space-around" cols="5">
                <LanguageSelector :columnIndex="1"/>
            </v-col>
            <v-col justify="space-around" cols="5">
                <LanguageSelector :columnIndex="2"/>
            </v-col>
        </v-row>
        <v-row v-for="(example, indexExample) in examples" :key="indexExample" justify="space-around">
            <v-col justify="space-around" cols="2">
                {{example.name}}<br>{{example.description}}
            </v-col>
            <v-col justify="space-around" cols="5">
                <LanguageExample v-if="selectedLanguages[1] && codeExamples[selectedLanguages[1]] && codeExamples[selectedLanguages[1]][indexExample]" :code="codeExamples[selectedLanguages[1]][indexExample].code"/>
            </v-col>
            <v-col justify="space-around" cols="5">
                <LanguageExample v-if="selectedLanguages[2] && codeExamples[selectedLanguages[2]] && codeExamples[selectedLanguages[2]][indexExample]" :code="codeExamples[selectedLanguages[2]][indexExample].code"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import { mapState } from 'vuex';

import LanguageExample from '@/components/LanguageExample.vue'
import LanguageSelector from '@/components/LanguageSelector.vue'

export default {
    components: {
        LanguageExample,
        LanguageSelector,
    },
    // created: async () => {
    //     await context.store.dispatch('languages/fetchLanguages');
    // },
    async fetch (context) {
        try {
            await context.store.dispatch('GlobalStore/fetchLanguages');
            await context.store.dispatch('GlobalStore/fetchExamples');
        }
        catch(e) {
            context.error({statusCode: 503, message: 'Unable to fetch languages at this time.'});
        };
    },
    computed: mapState({
        languages: state => state.GlobalStore.languages,
        examples: state => state.GlobalStore.examples,
        selectedLanguages: state => state.GlobalStore.selectedLanguages,
        codeExamples: state => state.GlobalStore.codeExamples,
    })
}
</script>
