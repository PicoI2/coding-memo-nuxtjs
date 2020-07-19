<template>
    <v-container fluid>
        
        <h1 v-if="language">{{language.name}}</h1>
        <h1 v-if="!language">NO LANGUAGE</h1>
        
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
			language: undefined,
		};
	},
    async fetch (context) {
        try {
            const res = await context.store.dispatch('GlobalStore/fetchLanguages');
            const languageName = context.params.language.toUpperCase();
            this.language = context.store.state.GlobalStore.languages.find(language => language.name.toUpperCase()==languageName);
            if (this.language) {
                await context.store.dispatch('GlobalStore/fetchCodeExamples', this.language.id);
            }
        }
        catch(e) {
            context.error({statusCode: 503, message: 'Unable to fetch languages at this time.'});
        };
    },
    computed: {
        ...mapState({
            languages: state => state.GlobalStore.languages,
            examples: state => state.GlobalStore.examples,
            codeExamples: state => state.GlobalStore.codeExamples,
        }),
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
