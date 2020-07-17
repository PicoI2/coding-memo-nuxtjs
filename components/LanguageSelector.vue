<template>
<div>
    <h1 class="display-1">Select language {{columnIndex}}:</h1>
    <v-select v-model="languageId" :items="languages" item-text="name" item-value="id" @change="languageSelected"></v-select>
</div>
</template>

<script>

import { mapState } from 'vuex';
import { mapMutations } from 'vuex';

export default {
    props: {
        columnIndex: Number
    },
    data () {
		return {
			languageId: undefined,
		};
	},
    async fetch (context) {
        try {
            await context.store.dispatch('GlobalStore/fetchLanguages');
        }
        catch(e) {
            context.error({statusCode: 503, message: 'Unable to fetch languages at this time.'});
        };
    },
    computed: mapState({
        languages: state => state.GlobalStore.languages,
        codeExamples: state => state.GlobalStore.codeExamples,
    }),
    methods: {
        ...mapMutations({setSelectedLanguage: 'GlobalStore/SET_SELECTED_LANGUAGE'}),
        languageSelected() {
            // this.$store.commit('GlobalStore/SET_SELECTED_LANGUAGE', this.columnIndex, this.language);
            this.setSelectedLanguage({columnIndex: this.columnIndex, languageId: this.languageId});
            if (!this.codeExamples[this.languageId]) {
                this.$store.dispatch('GlobalStore/fetchCodeExamples', this.languageId);
            }
        } 
    },
}
</script>
