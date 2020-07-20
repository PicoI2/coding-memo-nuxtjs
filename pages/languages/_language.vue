<template>
    <v-container fluid>
        
        <h1 v-if="language">{{language.name}}</h1>
        
        <v-row v-for="example in examples" :key="example.id" justify="space-around">
            <v-col justify="space-around" cols="2">
                <v-card>
                    <v-card-title>
                        {{example.name}}
                    </v-card-title>
                    {{example.description}}
                </v-card>
            </v-col>
            <v-col justify="space-around" cols="10">
                <LanguageExample :code="getCode(1, example.id)"/>
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
    data () {
		return {
			// language: undefined,
			// languageId: undefined,
		};
	},
    async fetch ({ store, error, params }) {
        try {
            await store.dispatch('GlobalStore/fetchLanguages');
            await store.dispatch('GlobalStore/fetchExamples');
            
            const languageName = params.language.toUpperCase();
            const language = store.state.GlobalStore.languages.find(language => language.name.toUpperCase()==languageName);
            if (language) {
                // I tried to modify this here, but on the client side language and languageId are undefined !
                // this.languageId = language.id;
                await store.dispatch('GlobalStore/fetchCodeExamples', language.id);
            }
        }
        catch(e) {
            error({statusCode: 503, message: 'Unable to fetch languages at this time.'});
        };
    },
    computed: {
        ...mapState({
            languages: state => state.GlobalStore.languages,
            examples: state => state.GlobalStore.examples,
            codeExamples: state => state.GlobalStore.codeExamples,
            languageId: state => state.GlobalStore.languageId,
        }),
        language() {
            const language = this.languages.find(language => language.id==this.languageId);
            return language;
        }
    },
    methods: {
        getCode(exampleId) {
            let code = '';
            if (this.language && this.language.id && this.codeExamples[this.language.id]) {
                const codeExample = this.codeExamples[this.language.id].find(codeExample => codeExample.example_id==exampleId);
                if (codeExample) {
                    return codeExample.code;
                }
            }
            return code;
        }
    },
}
</script>
