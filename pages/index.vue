<template>
    <v-container fluid>
        
        <v-row justify="space-around" class="sticky">
            <v-col justify="space-around" cols="2"/>
            <v-col justify="space-around" cols="5">
                <LanguageSelector :columnIndex="1"/>
            </v-col>
            <v-col justify="space-around" cols="5">
                <LanguageSelector :columnIndex="2"/>
            </v-col>
        </v-row>
        
        <v-row v-for="example in examples" :key="example.id" justify="space-around">
            <v-col justify="space-around" cols="2">
                <v-card>
                    <v-card-title>
                        {{example.name}}
                    </v-card-title>
                    {{example.description}}
                </v-card>
            </v-col>
            <v-col justify="space-around" cols="5">
                <LanguageExample :code="getCode(1, example.id)"/>
            </v-col>
            <v-col justify="space-around" cols="5">
                <LanguageExample :code="getCode(2, example.id)"/>
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
    computed: {
        ...mapState({
            languages: state => state.GlobalStore.languages,
            examples: state => state.GlobalStore.examples,
            selectedLanguages: state => state.GlobalStore.selectedLanguages,
            codeExamples: state => state.GlobalStore.codeExamples,
        }),
    },
    methods: {
        getCode(column, exampleId) {
            let code = '';
            const selectedLanguagesId = this.selectedLanguages[column];
            if (selectedLanguagesId && this.codeExamples[selectedLanguagesId]) {
                const codeExample = this.codeExamples[selectedLanguagesId].find(codeExample => codeExample.example_id==exampleId);
                if (codeExample) {
                    return codeExample.code;
                }
            }
            return code;
        }
    },
}
</script>

<style scoped>
.sticky {
	position: sticky;
    top: 4em;
    z-index: 1;
}
</style>