<template>
    <v-container fluid>
        <v-row justify="space-around">
            <v-col justify="space-around">
                <h1 class="display-1">Select language 1:</h1>
                <v-select v-model="language1" :items="languages" item-value="id" item-text="name"></v-select>
            </v-col>
            <v-col justify="space-around">
                <h1 class="display-1">Select language 2:</h1>
                <v-select v-model="language2" :items="languages" item-value="id" item-text="name"></v-select>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import { mapState } from 'vuex';

export default {
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
        languages: state => state.GlobalStore.languages
    })
}
</script>
