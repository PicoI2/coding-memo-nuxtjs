<template>
<div v-html="formatedCode">
</div>
</template>

<script>
import hljs from 'highlight.js'

// import { mapState } from 'vuex';
// import { mapMutations } from 'vuex';

export default {
    props: {
        code: String
    },
    computed: {
        formatedCode () {
            let formated = hljs.highlight('js', this.code, true).value;
            return formated.replace(/({{|}})/g, '<span>$1</span>')
        }
    }
}
</script>
