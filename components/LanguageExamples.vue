<template>
<div>
    <h1 class="display-1">Select language 1:</h1>
    <v-select v-model="language1" :items="languages" item-value="id" item-text="name"></v-select>
</div>
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
