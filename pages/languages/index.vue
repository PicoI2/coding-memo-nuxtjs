<template>
    <v-container fluid>
        <v-row v-for="language in orderedLanguages" :key="language.id" justify="space-around">
            <v-btn text x-large color="primary" :href="`/languages/${language.name}`">{{language.name}}</v-btn>
        </v-row>
    </v-container>
</template>

<script>

import { mapState } from 'vuex';

export default {
    head() {
        return {
            title: 'Select language - ',
        }
    },
    async fetch (context) {
        try {
            await context.store.dispatch('GlobalStore/fetchLanguages');
        }
        catch(e) {
            context.error({statusCode: 503, message: 'Unable to fetch languages at this time.'});
        };
    },
    computed: {
        ...mapState({
            languages: state => state.GlobalStore.languages,
        }),
        orderedLanguages: function () {
            let orderedLanguages = this.languages.concat(); // Make a copy of the array to sort it without modifying it.
            return orderedLanguages.sort((language1, language2) => {
                return language1.name.localeCompare(language2.name);
            });
        }
    },
}
</script>
