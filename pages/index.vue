<template>
<div>
    <h1>Liste des languages: </h1>
    <h3 v-for="(language, index) in languages" :key="index" :language="language" :data-index="index" >
    {{language}}
    </h3>
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
