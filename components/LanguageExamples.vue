<template>
<div>
    <h1 class="display-1">Select language {{columnIndex}}:</h1>
    <v-select v-model="language" :items="languages" item-text="name" @change="languageSelected"></v-select>
</div>
</template>

<script>

import { mapState } from 'vuex';
import { mapMutations } from 'vuex';

export default {
    // created: async () => {
    //     await context.store.dispatch('languages/fetchLanguages');
    // },
    props: {
        columnIndex: Number
    },
    data () {
		return {
			language: undefined,
		};
	},
    async fetch (context) {
        try {
            await context.store.dispatch('GlobalStore/fetchLanguages')
        }
        catch(e) {
            context.error({statusCode: 503, message: 'Unable to fetch languages at this time.'});
        };
    },
    computed: mapState({
        languages: state => state.GlobalStore.languages
    }),
    methods: {
        ...mapMutations({setSelectedLanguage: 'GlobalStore/SET_SELECTED_LANGUAGE'}),
        languageSelected() {
            // this.$store.commit('GlobalStore/SET_SELECTED_LANGUAGE', this.columnIndex, this.language);
            this.setSelectedLanguage({columnIndex: this.columnIndex, language: this.language});
        } 
    },
}
</script>
