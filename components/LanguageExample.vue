<template>
<v-card>
<pre v-html="formatedCode">
</pre>
</v-card>
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
            if (this.code) {
                let formated = hljs.highlight('js', this.code, true).value;
                return formated.replace(/({{|}})/g, '<span>$1</span>')
            }
            return '';
        }
    }
}
</script>
